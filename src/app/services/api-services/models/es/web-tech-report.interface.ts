import {DataPoint} from "../analytics/data-point.interface";

export interface WebTechReport {
  uses_wordpress: boolean,
  uses_iis: boolean,
  uses_apache: boolean,
  ports: DataPoint[],
  network_ranges: DataPoint[],
  ssl_support: DataPoint[],
}
