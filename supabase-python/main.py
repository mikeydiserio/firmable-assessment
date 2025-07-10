import os
import xml.etree.ElementTree as ET
import psycopg2
from psycopg2 import extras
from dotenv import load_dotenv
from datetime import datetime
from dataclasses import dataclass
# --- Configuration ---
# Load environment variables from .env
load_dotenv()
# Fetch variables (use uppercase for consistency)
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
HOST = os.getenv("HOST")
PORT = os.getenv("PORT")
DBNAME = os.getenv("DBNAME")

print("USER:", USER)
print("HOST:", HOST)
print("PORT:", PORT)

@dataclass(frozen=True)
class Config:
    """Holds all application configuration."""
    db_host: str
    db_user: str
    db_password: str
    db_port: int
    db_name: str
    xml_data_directory: str


# Directory containing your ABN XML files
XML_DATA_DIRECTORY = './data'

# --- Helper Functions ---

def parse_date(date_str):
    """
    Safely parse a date string in yyyymmdd format.
    Converts placeholder date '19000101' to None.
    """
    if not date_str or len(date_str) != 8 or date_str == '19000101':
        return None
    try:
        return datetime.strptime(date_str, '%Y%m%d').date()
    except (ValueError, TypeError):
        return None

def get_db_connection():
    """Establishes and returns a connection to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            host=HOST,
            dbname=DBNAME,
            user=USER,
            password=PASSWORD,
            port=int(PORT) if PORT else 5432
        )
        return conn
    except psycopg2.OperationalError as e:
        print(f"Error: Could not connect to the database. Please check your credentials. Details: {e}")
        return None

def process_abr_record(abr_element):
    """
    Extracts data from a single <ABR> XML element and organizes it into dictionaries.
    Returns a dictionary containing data for 'entities', 'entity_types', 'business_names', etc.
    """
    data = {
        'entity': {},
        'entity_type': {},
        'location': None,
        'business_names': [],
        'dgr_funds': []
    }

    # --- Extract Core Entity Information ---
    abn_node = abr_element.find('ABN')
    data['entity']['abn'] = abn_node.text
    data['entity']['abn_status'] = abn_node.get('status')
    data['entity']['abn_status_from_date'] = parse_date(abn_node.get('ABNStatusFromDate'))
    data['entity']['last_updated'] = parse_date(abr_element.get('recordLastUpdatedDate'))

    # --- Extract Entity Type (for lookup table) ---
    entity_type_node = abr_element.find('EntityType')
    if entity_type_node is not None:
        type_code = entity_type_node.find('EntityTypeInd').text
        type_text = entity_type_node.find('EntityTypeText').text
        data['entity']['entity_type_code'] = type_code
        data['entity_type'] = {'code': type_code, 'description': type_text}

    # --- Extract Legal Name (handles both MainEntity and LegalEntity) ---
    main_entity_node = abr_element.find('MainEntity/NonIndividualName/NonIndividualNameText')
    if main_entity_node is not None:
        data['entity']['legal_name'] = main_entity_node.text.strip() if main_entity_node.text else None
    else:
        legal_entity_node = abr_element.find('LegalEntity/IndividualName')
        if legal_entity_node is not None:
            given_names = [gn.text for gn in legal_entity_node.findall('GivenName') if gn.text]
            family_name = legal_entity_node.find('FamilyName').text or ''
            data['entity']['legal_name'] = ' '.join(given_names + [family_name]).strip()

    # --- Extract Address (for new locations table) ---
    address_node = abr_element.find('.//AddressDetails')
    if address_node is not None:
        state = address_node.find('State').text
        postcode = address_node.find('Postcode').text
        if state and postcode:
            data['location'] = (state, postcode)

    # --- Extract ASIC Number ---
    asic_node = abr_element.find('ASICNumber')
    if asic_node is not None:
        data['entity']['asic_number'] = asic_node.text

    # --- Extract GST Information ---
    gst_node = abr_element.find('GST')
    if gst_node is not None:
        data['entity']['gst_status'] = gst_node.get('status')
        data['entity']['gst_status_from_date'] = parse_date(gst_node.get('GSTStatusFromDate'))

    # --- Extract Business Names (OtherEntity) ---
    for other_entity_node in abr_element.findall('OtherEntity'):
        name_node = other_entity_node.find('NonIndividualName')
        if name_node is not None and name_node.find('NonIndividualNameText') is not None:
            data['business_names'].append({
                'abn': data['entity']['abn'],
                'name': name_node.find('NonIndividualNameText').text,
                'type': name_node.get('type')
            })

    # --- Extract DGR Funds ---
    for dgr_node in abr_element.findall('DGR'):
        name_node = dgr_node.find('NonIndividualName')
        if name_node is not None and name_node.find('NonIndividualNameText') is not None:
            data['dgr_funds'].append({
                'abn': data['entity']['abn'],
                'fund_name': name_node.find('NonIndividualNameText').text,
                'status_from_date': parse_date(dgr_node.get('DGRStatusFromDate'))
            })

    return data

# --- Main Execution Logic ---

def main():
    """Main function to orchestrate the data processing and upload."""
    print("Starting ABN data processing and upload to Supabase.")

    conn = get_db_connection()
    if not conn:
        return

    cursor = conn.cursor()

    try:
        xml_files = [f for f in os.listdir(XML_DATA_DIRECTORY) if f.endswith('.xml')]
        if not xml_files:
            print(f"Error: No XML files found in the '{XML_DATA_DIRECTORY}' directory.")
            return
        print(f"Found {len(xml_files)} XML files to process.")
    except FileNotFoundError:
        print(f"Error: The directory '{XML_DATA_DIRECTORY}' was not found.")
        return

    # --- Pre-fetch existing lookup data into caches ---
    cursor.execute("SELECT code FROM public.entity_types;")
    entity_types_cache = {row[0] for row in cursor.fetchall()}
    print(f"Cached {len(entity_types_cache)} existing entity types.")

    cursor.execute("SELECT id, state, postcode FROM public.locations;")
    locations_cache = {(row[1], row[2]): row[0] for row in cursor.fetchall()}
    print(f"Cached {len(locations_cache)} existing locations.")

    for filename in xml_files:
        filepath = os.path.join(XML_DATA_DIRECTORY, filename)
        print(f"\n--- Processing file: {filename} ---")
        
        try:
            context = ET.iterparse(filepath, events=('end',))
            
            entities_to_insert = []
            entity_types_to_insert = []
            business_names_to_insert = []
            dgr_funds_to_insert = []
            new_locations_to_insert = set()

            for event, elem in context:
                if elem.tag == 'ABR':
                    record = process_abr_record(elem)
                    
                    # Add entity data to be inserted later
                    entities_to_insert.append(record)
                    
                    # Collect new entity types
                    if record['entity_type'] and record['entity_type']['code'] not in entity_types_cache:
                        entity_types_to_insert.append(record['entity_type'])
                        entity_types_cache.add(record['entity_type']['code'])

                    # Collect new locations
                    if record['location'] and record['location'] not in locations_cache:
                        new_locations_to_insert.add(record['location'])

                    if record['business_names']:
                        business_names_to_insert.extend(record['business_names'])
                    
                    if record['dgr_funds']:
                        dgr_funds_to_insert.extend(record['dgr_funds'])
                    
                    elem.clear()

            # --- Batch Insert New Lookup Data ---
            print(f"File parsed. Inserting new lookup data...")

            # 1. Insert new Entity Types
            if entity_types_to_insert:
                extras.execute_values(cursor, "INSERT INTO public.entity_types (code, description) VALUES %s ON CONFLICT (code) DO NOTHING",
                                      [(et['code'], et['description']) for et in entity_types_to_insert])
                print(f"Inserted {len(entity_types_to_insert)} new entity types.")

            # 2. Insert new Locations and update cache
            if new_locations_to_insert:
                extras.execute_values(cursor, "INSERT INTO public.locations (state, postcode) VALUES %s ON CONFLICT (state, postcode) DO NOTHING RETURNING id, state, postcode",
                                      list(new_locations_to_insert))
                newly_added = cursor.fetchall()
                for loc_id, state, postcode in newly_added:
                    locations_cache[(state, postcode)] = loc_id
                print(f"Inserted {len(newly_added)} new locations.")
            
            conn.commit()

            # --- Prepare and Batch Insert Core and Relational Data ---
            print("Preparing final data for insertion...")
            
            # Prepare entities with correct location_id
            final_entities = []
            for record in entities_to_insert:
                entity_data = record['entity']
                location_tuple = record.get('location')
                location_id = locations_cache.get(location_tuple) if location_tuple else None
                entity_data['location_id'] = location_id
                final_entities.append(entity_data)

            # 3. Insert Entities
            if final_entities:
                cols = ['abn', 'abn_status', 'abn_status_from_date', 'entity_type_code', 'legal_name', 'asic_number', 'gst_status', 'gst_status_from_date', 'location_id', 'last_updated']
                extras.execute_values(
                    cursor,
                    f"""INSERT INTO public.entities ({', '.join(cols)}) VALUES %s 
                        ON CONFLICT (abn) DO UPDATE SET 
                        ({', '.join(cols)}) = ({', '.join([f'EXCLUDED.{c}' for c in cols])});
                    """,
                    [tuple(e.get(col) for col in cols) for e in final_entities]
                )
                print(f"Upserted {len(final_entities)} entities.")

            # 4. Insert Business Names
            if business_names_to_insert:
                extras.execute_values(cursor, "INSERT INTO public.business_names (abn, name, type) VALUES %s",
                                      [(bn['abn'], bn['name'], bn['type']) for bn in business_names_to_insert])
                print(f"Inserted {len(business_names_to_insert)} business names.")
            
            # 5. Insert DGR Funds
            if dgr_funds_to_insert:
                 extras.execute_values(cursor, "INSERT INTO public.dgr_funds (abn, fund_name, status_from_date) VALUES %s",
                                       [(dgr['abn'], dgr['fund_name'], dgr['status_from_date']) for dgr in dgr_funds_to_insert])
                 print(f"Inserted {len(dgr_funds_to_insert)} DGR funds.")

            conn.commit()
            print(f"Successfully committed data from {filename}.")

        except (ET.ParseError, psycopg2.Error) as e:
            print(f"An error occurred while processing {filepath}: {e}")
            conn.rollback()

    cursor.close()
    conn.close()
    print("\nAll files processed. Database connection closed.")

if __name__ == "__main__":
    main()
