
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
  | 'name-asc'
  | 'name-desc'
  | 'revenue-asc'
  | 'revenue-desc'
  | 'employees-asc'
  | 'employees-desc';

export interface IFilters {
  searchTerm: string;
  industry: string;
  employeeRange: number;
  states: string[];
  revenueBand: string;
}