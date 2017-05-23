import { Injectable } from '@angular/core';
import {DataTableConfiguration} from "./models/data-table-configuration.class";
import {Network} from "../../services/api-services/models/network.class";
import {Organization} from "../../services/api-services/models/organization.class";
import {WebService} from "../../services/api-services/models/web-service.interface";
import {HttpTransaction} from "../../services/api-services/models/es/http-transaction.interface";
import {DomainName} from "../../services/api-services/models/domain-name.class";

@Injectable()
export class WsTableService {

  constructor() { }

  public buildTableFromArray(tableContents: any[], columns?: string[]): DataTableConfiguration {
    let toReturn = new DataTableConfiguration();
    toReturn.addAsRows(tableContents);
    if (columns) {
      toReturn.setColumns(columns);
    }
    return toReturn;
  }

  public buildDomainsTableFromArray(tableContents: DomainName[]): DataTableConfiguration {
    return this.buildTableFromArray(tableContents);
  }

  public buildNetworksTableFromArray(tableContents: Network[]): DataTableConfiguration {
    let networkRows = this.getNetworkRowsFromContents(tableContents);
    return this.buildTableFromArray(networkRows);
  }

  public buildOrganizationsTableFromArray(tableContents: Organization[]): DataTableConfiguration {
    return this.buildTableFromArray(tableContents);
  }

  public buildTransactionsTableFromArray(tableContents: HttpTransaction[]): DataTableConfiguration {
    return this.buildTableFromArray(tableContents);
  }

  public buildWebAppsTableFromArray(tableContents: WebService[]): DataTableConfiguration {
    let webAppRows = this.getWebAppRowsFromContents(tableContents);
    return this.buildTableFromArray(webAppRows);
  }

  private getNetworkRowsFromContents(tableContents: Network[]): any[] {
    let toReturn = [];
    for (let content of tableContents) {
      toReturn.push({
        uuid: content.uuid,
        name: content.name,
        scanning_enabled: content.scanning_enabled,
        network: content.address + '/' + content.mask_length.toString(),
        network_size: Math.pow(2, 32 - content.mask_length)
      });
    }
    return toReturn;
  }

  private getWebAppRowsFromContents(tableContents: WebService[]): any[] {
    let toReturn = [];
    for (let content of tableContents) {
      let urlScheme = content.sslEnabled ? 'https' : 'http';
      let url = '';
      if ((content.sslEnabled && content.port == 443) || (!content.sslEnabled && content.port == 80)) {
        url = urlScheme + '://' + content.hostname + '/';
      } else {
        url = urlScheme + '://' + content.hostname + ':' + content.port.toString() + '/';
      }
      toReturn.push({
        uuid: content.uuid,
        ip_address: content.ip_address,
        port: content.port,
        host_name: content.hostname,
        ssl_enabled: content.sslEnabled,
        url: url,
      });
    }
    return toReturn;
  }

}
