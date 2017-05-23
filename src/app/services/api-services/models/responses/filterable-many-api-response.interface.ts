export interface FilterableManyApiResponse<T> {
  results: T,
  count: number,
  first_page: number,
  last_page: number,
  current_page: number,
  page_size: number,
  filterable_fields: string[],
}
