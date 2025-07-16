export interface Address {
  street: string
  suburb: string
  state: string
  postcode: string
}

export interface Company {
  id: number
  name: string
  abn: string
  acn: string
  industry: string
  industryCode: string
  employeeCount: number
  revenueBand: string
  website: string
  emailDomain: string
  phone: string
  address: Address
}

export type SortByOption =
  | 'name-asc'
  | 'name-desc'
  | 'revenue-asc'
  | 'revenue-desc'
  | 'employees-asc'
  | 'employees-desc'

export interface IFilters {
  searchTerm: string
  industry: string
  employeeRange: number
  states: { value: string; label: string }[]
  revenueBand: string
}
// This file can be saved as `types.ts` or similar in your project.

// Interface for the 'locations' table
export interface Location {
  id: number;
  state: string;
  postcode: string;
}

// Interface for the 'entity_types' table
export interface EntityType {
  code: string;
  description?: string;
}

// Interface for the 'business_names' table
export interface BusinessName {
  id: number;
  abn: string;
  name?: string;
  type?: string;
}

// Interface for the 'dgr_funds' table
export interface DgrFund {
  id: number;
  abn: string;
  fund_name: string;
  'status_from_...': string; // Note: You might want to rename this column in your DB to be more JS-friendly
}

// The main, combined interface for an 'Entity' record
// This represents the data structure returned by the optimized API call.
export interface Entity {
  // Fields from the 'entities' table
  abn: string;
  abn_status: string;
  abn_status_from_date: string; // Assuming date is returned as string
  entity_type_code: string;
  legal_name: string;
  gst_status: string;
  gst_status_from_date: string; // Assuming date is returned as string
  state: string;
  postcode: string;
  last_updated: string; // Assuming date is returned as string
  location_id: number;

  // Nested data from related tables
  business_names: BusinessName[]; // An array of business names
  dgr_funds: DgrFund[];          // An array of DGR funds
  entity_types: EntityType;      // A single related entity type object
  locations: Location;           // A single related location object
}
