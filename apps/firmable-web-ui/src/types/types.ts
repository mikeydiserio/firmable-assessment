export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
}

export interface Company {
  id: number;
  name: string;
  abn: string;
  acn: string;
  industry: string;
  industryCode: string;
  employeeCount: number;
  revenueBand: string;
  website: string;
  emailDomain: string;
  phone: string;
  address: Address;
}

export type SortByOption =
  | "name-asc"
  | "name-desc"
  | "revenue-asc"
  | "revenue-desc"
  | "employees-asc"
  | "employees-desc";

export interface IFilters {
  searchTerm: string;
  industry: string;
  employeeRange: number;
  states: string[];
  revenueBand: string;
}

export interface BusinessName {
  id: number;
  abn: string;
  name: string | null;
  type: string | null;
}

export interface DgrFund {
  id: number;
  abn: string;
  fund_name: string | null;
  status_from_date: string | null;
}

export interface Entity {
  abn: string;
  abn_status: string | null;
  abn_status_from_date: string | null;
  entity_type_code: string | null;
  legal_name: string | null;
  asic_number: string | null;
  gst_status: string | null;
  gst_status_from_date: string | null;
  state: string | null;
  postcode: string | null;
  last_updated: string | null;
  location_id: number | null;
}

export interface EntityType {
  code: string;
  description: string | null;
}

export interface Location {
  id: number;
  state: string;
  postcode: string;
}
