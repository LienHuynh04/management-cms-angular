export interface IPaginateList<T> {
  data: T[];
  pagination: IPagination;
}

export interface IPagination {
  total: number;
  currentPage: number;
  perPage: number;
  count?: number;
  links?: string[];
  totalPages?: number;
  totalRecords?: number;
}
