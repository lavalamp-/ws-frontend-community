export interface DomainsUploadResponse {
  new_domains: number,
  skipped: number,
  errored: number,
  batch_required: boolean,
}
