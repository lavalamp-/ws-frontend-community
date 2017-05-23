import {DataPoint} from "./data-point.interface";

export interface WebResourceAnalytics {
  content_type: DataPoint[],
  response_status: DataPoint[],
  has_login_form: DataPoint[],
  request_method: DataPoint[],
}
