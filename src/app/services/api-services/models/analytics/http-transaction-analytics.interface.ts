import {DataPoint} from "./data-point.interface";

export interface HttpTransactionAnalytics {
  content_types: DataPoint[],
  response_statuses: DataPoint[],
  content_lengths: DataPoint[],
}
