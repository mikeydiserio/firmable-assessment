import os
import logging
import xml.etree.ElementTree as ET
from contextlib import contextmanager
from dataclasses import dataclass
from datetime import date, datetime
from typing import Iterator, Dict, Any, Tuple, List, Set, Generator

import psycopg2
from psycopg2 import extras
from dotenv import load_dotenv

# --- 1. Professional Logging Setup ---
# Instead of print(), use the logging module for structured, configurable output.
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# --- 2. Structured Configuration ---
# Encapsulate all settings into a class. This is cleaner than loose variables
# and makes configuration management much easier as the project grows.
@dataclass(frozen=True)
class Config:
    """Holds all application configuration."""
    db_host: str
    db_user: str
    db_password: str
    db_port: int
    db_name: str
    xml_data_directory: str

def load_config_from_env() -> Config:
    """Loads configuration from environment variables."""
   # Load environment variables from .env
    load_dotenv()
    # Fetch variables
    USER = os.getenv("user")
    PASSWORD = os.getenv("password")
    HOST = os.getenv("host")
    PORT = os.getenv("port")
    DBNAME = os.getenv("dbname")

    return Config(
        db_host=HOST,
        db_user=USER,
        db_password=PASSWORD,
        db_name=DBNAME,
        db_port=PORT,
        xml_data_directory='data'
    )

# --- 3. Robust Database Connection Management ---
# A context manager ensures the database connection is always handled correctly
# (opened, committed/rolled back, and closed), even if errors occur.
@contextmanager
def get_db_connection(config: Config) -> Generator[psycopg2.extensions.connection, None, None]:
    """
    Provides a managed database connection using a DSN string for reliability.
    """
    conn = None
    # Construct a DSN string. This is a more robust way to connect, especially
    # on Windows, as it avoids ambiguity in how connection parameters are parsed.
    dsn = (
        f"postgresql://{config.db_user}:{config.db_password}@"
        f"{config.db_host}:{config.db_port}/{config.db_name}"
    )
    try:
        conn = psycopg2.connect(dsn)
        yield conn
    except psycopg2.OperationalError as e:
        logging.error(f"Database connection failed: {e}")
        raise
    finally:
        if conn:
            conn.close()
            logging.info("Database connection closed.")

# --- 4. Modular Data Parsing and Transformation ---
# Each function now has a single, clear responsibility.

def parse_date(date_str: str) -> date | None:
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

def process_abr_record(abr_element: ET.Element) -> Dict[str, Any]:
    """Extracts data from a single <ABR> XML element into a structured dictionary."""
    # This function's logic is largely the same, but it's now a pure transformation step.
    data = {
        'entity': {}, 'entity_type': {}, 'location': None,
        'business_names': [], 'dgr_funds': []
    }
    abn_node = abr_element.find('ABN')
    data['entity']['abn'] = abn_node.text
    data['entity']['abn_status'] = abn_node.get('status')
    data['entity']['abn_status_from_date'] = parse_date(abn_node.get('ABNStatusFromDate'))
    data['entity']['last_updated'] = parse_date(abr_element.get('recordLastUpdatedDate'))

    entity_type_node = abr_element.find('EntityType')
    if entity_type_node is not None:
        type_code = entity_type_node.find('EntityTypeInd').text
        type_text = entity_type_node.find('EntityTypeText').text
        data['entity']['entity_type_code'] = type_code
        data['entity_type'] = {'code': type_code, 'description': type_text}

    main_entity_node = abr_element.find('MainEntity/NonIndividualName/NonIndividualNameText')
    if main_entity_node is not None:
        data['entity']['legal_name'] = main_entity_node.text.strip() if main_entity_node.text else None
    else:
        legal_entity_node = abr_element.find('LegalEntity/IndividualName')
        if legal_entity_node is not None:
            given_names = [gn.text for gn in legal_entity_node.findall('GivenName') if gn.text]
            family_name = legal_entity_node.find('FamilyName').text or ''
            data['entity']['legal_name'] = ' '.join(given_names + [family_name]).strip()

    address_node = abr_element.find('.//AddressDetails')
    if address_node is not None:
        state = address_node.find('State').text
        postcode = address_node.find('Postcode').text
        if state and postcode:
            data['location'] = (state, postcode)

    asic_node = abr_element.find('ASICNumber')
    if asic_node is not None:
        data['entity']['asic_number'] = asic_node.text

    gst_node = abr_element.find('GST')
    if gst_node is not None:
        data['entity']['gst_status'] = gst_node.get('status')
        data['entity']['gst_status_from_date'] = parse_date(gst_node.get('GSTStatusFromDate'))

    for other_entity_node in abr_element.findall('OtherEntity'):
        name_node = other_entity_node.find('NonIndividualName')
        if name_node is not None and name_node.find('NonIndividualNameText') is not None:
            data['business_names'].append({
                'abn': data['entity']['abn'], 'name': name_node.find('NonIndividualNameText').text,
                'type': name_node.get('type')
            })

    for dgr_node in abr_element.findall('DGR'):
        name_node = dgr_node.find('NonIndividualName')
        if name_node is not None and name_node.find('NonIndividualNameText') is not None:
            data['dgr_funds'].append({
                'abn': data['entity']['abn'], 'fund_name': name_node.find('NonIndividualNameText').text,
                'status_from_date': parse_date(dgr_node.get('DGRStatusFromDate'))
            })
    return data

def parse_xml_file(filepath: str) -> Generator[Dict[str, Any], None, None]:
    """
    Parses a large XML file efficiently using iterparse and yields processed records.
    This is a generator function, which is highly memory-efficient.
    """
    logging.info(f"Streaming records from {os.path.basename(filepath)}...")
    try:
        context = ET.iterparse(filepath, events=('end',))
        for _, elem in context:
            if elem.tag == 'ABR':
                yield process_abr_record(elem)
                elem.clear()  # Essential for memory management
    except ET.ParseError as e:
        logging.error(f"XML parsing error in {filepath}: {e}")

# --- 5. Main Orchestration Logic ---

def prefetch_lookup_caches(cursor: psycopg2.extensions.cursor) -> Tuple[Set[str], Dict[Tuple[str, str], int]]:
    """Fetches existing lookup data from the DB to avoid redundant inserts."""
    cursor.execute("SELECT code FROM public.entity_types;")
    entity_types_cache = {row[0] for row in cursor.fetchall()}
    logging.info(f"Cached {len(entity_types_cache)} existing entity types.")

    cursor.execute("SELECT id, state, postcode FROM public.locations;")
    locations_cache = {(row[1], row[2]): row[0] for row in cursor.fetchall()}
    logging.info(f"Cached {len(locations_cache)} existing locations.")
    return entity_types_cache, locations_cache

def process_batch(cursor: psycopg2.extensions.cursor, records: List[Dict[str, Any]], caches: Dict[str, Any]):
    """Processes a batch of records, inserting them into the database."""
    entity_types_cache, locations_cache = caches['entity_types'], caches['locations']
    
    # 1. Identify and insert new lookup values
    new_entity_types = [r['entity_type'] for r in records if r['entity_type'] and r['entity_type']['code'] not in entity_types_cache]
    if new_entity_types:
        extras.execute_values(cursor, "INSERT INTO public.entity_types (code, description) VALUES %s ON CONFLICT (code) DO NOTHING",
                              [(et['code'], et['description']) for et in new_entity_types])
        for et in new_entity_types: entity_types_cache.add(et['code'])
        logging.info(f"Inserted {len(new_entity_types)} new entity types.")

    new_locations = {r['location'] for r in records if r['location'] and r['location'] not in locations_cache}
    if new_locations:
        newly_added = extras.execute_values(cursor, "INSERT INTO public.locations (state, postcode) VALUES %s ON CONFLICT (state, postcode) DO NOTHING RETURNING id, state, postcode",
                                            list(new_locations), fetch=True)
        for loc_id, state, postcode in newly_added: locations_cache[(state, postcode)] = loc_id
        logging.info(f"Inserted {len(newly_added)} new locations.")
    
    # 2. Prepare and insert main entity data
    final_entities = []
    for record in records:
        entity_data = record['entity']
        location_id = locations_cache.get(record.get('location'))
        entity_data['location_id'] = location_id
        final_entities.append(entity_data)

    if final_entities:
        cols = ['abn', 'abn_status', 'abn_status_from_date', 'entity_type_code', 'legal_name', 'asic_number', 'gst_status', 'gst_status_from_date', 'location_id', 'last_updated']
        extras.execute_values(cursor, f"INSERT INTO public.entities ({', '.join(cols)}) VALUES %s ON CONFLICT (abn) DO UPDATE SET ({', '.join(cols)}) = ({', '.join([f'EXCLUDED.{c}' for c in cols])});",
                              [tuple(e.get(col) for col in cols) for e in final_entities])
        logging.info(f"Upserted {len(final_entities)} entities.")

    # 3. Prepare and insert relational data
    business_names = [bn for r in records for bn in r['business_names']]
    if business_names:
        extras.execute_values(cursor, "INSERT INTO public.business_names (abn, name, type) VALUES %s",
                              [(bn['abn'], bn['name'], bn['type']) for bn in business_names])
        logging.info(f"Inserted {len(business_names)} business names.")

    dgr_funds = [dgr for r in records for dgr in r['dgr_funds']]
    if dgr_funds:
        extras.execute_values(cursor, "INSERT INTO public.dgr_funds (abn, fund_name, status_from_date) VALUES %s",
                              [(dgr['abn'], dgr['fund_name'], dgr['status_from_date']) for dgr in dgr_funds])
        logging.info(f"Inserted {len(dgr_funds)} DGR funds.")

def main():
    """Main ETL orchestration function."""
    logging.info("Starting ABN data processing job.")
    config = load_config_from_env()

    try:
        filepaths = [os.path.join(config.xml_data_directory, f) for f in os.listdir(config.xml_data_directory) if f.endswith('.xml')]
        if not filepaths:
            logging.warning(f"No XML files found in '{config.xml_data_directory}'. Exiting.")
            return
    except FileNotFoundError:
        logging.error(f"Data directory '{config.xml_data_directory}' not found. Please create it and add XML files.")
        return

    try:
        with get_db_connection(config) as conn:
            with conn.cursor() as cursor:
                entity_types_cache, locations_cache = prefetch_lookup_caches(cursor)
                caches = {'entity_types': entity_types_cache, 'locations': locations_cache}

                for filepath in filepaths:
                    batch = []
                    for record in parse_xml_file(filepath):
                        batch.append(record)
                        if len(batch) >= 1000:  # Process in batches of 1000 records
                            logging.info(f"Processing batch of {len(batch)} records...")
                            process_batch(cursor, batch, caches)
                            conn.commit()
                            batch = []
                    
                    if batch: # Process the final, smaller batch
                        logging.info(f"Processing final batch of {len(batch)} records...")
                        process_batch(cursor, batch, caches)
                        conn.commit()
                    
                    logging.info(f"Finished processing {os.path.basename(filepath)}.")

    except (psycopg2.Error, Exception) as e:
        logging.critical(f"A critical error occurred during the ETL process: {e}", exc_info=True)

    logging.info("ABN data processing job finished.")

if __name__ == "__main__":
    main()
