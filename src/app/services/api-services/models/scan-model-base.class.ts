import {BaseModel} from "./model-base.class";

export class BaseScanModel extends BaseModel {

  public scan_completed_at: string;
  public is_latest_scan: boolean;

  get scanCompletedDate(): Date {
    if (this.scan_completed_at) {
      return new Date(this.scan_completed_at);
    } else {
      return null;
    }
  }

  get timeSinceScan(): string {
    if (this.scanCompletedDate) {
      let now = new Date();
      let difference = now.getTime() - this.scanCompletedDate.getTime();
      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      if (days > 0) {
        return 'Last scanned ' + days.toString() + ' days ago';
      } else {
        let hours = Math.floor(difference / (1000 * 60 * 60));
        if (hours > 0) {
          return 'Last scanned ' + hours.toString() + ' hours ago';
        } else {
          let minutes = Math.floor(difference / (1000 * 60));
          return 'Last scanned ' + minutes.toString() + ' minutes ago';
        }
      }
    } else {
      return 'Last scan time unknown';
    }
  }

}
