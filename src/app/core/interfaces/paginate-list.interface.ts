export interface IPaginateList<T> {
  data: T[];
  pagination: IPagination;
}

export interface IPagination {
  count?: number;
  currentPage?: number;
  links?: string[];
  perPage?: number;
  total?: number;
  totalPages?: number;
  totalRecords?: number;
}
