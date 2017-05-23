export interface ManyApiResponse<T> {
  results: T,
  count: number,
  first_page: number,
  last_page: number,
  current_page: number,
  page_size: number,
  filter_fields: string[],
  sortable_fields: string[],
}
