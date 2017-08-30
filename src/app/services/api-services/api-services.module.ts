import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "./auth.service";
import { OrganizationService } from "./organization.service";
import {ApiResponseService} from "./api-response.service";
import {WsHttpService} from "./ws-http.service";
import {ApiErrorService} from "./api-error.service"
import {AccountService} from "./account.service";
import {AdminService} from "./admin.service";
import {WebServiceService} from "./web-service.service";
import {WebServiceScanService} from "./web-service-scan.service";
import {QueryHelperService} from "./query-helper.service";
import {WsNetworkService} from "./ws-network.service";
import {WsUserService} from "./ws-user.service";
import {WsDomainNameService} from "./ws-domain-name.service";
import {WsNetworkServiceService} from "./ws-network-service.service";
import {WsSslSupportService} from "./ws-ssl-support.service";
import {WsConversionService} from "./ws-conversion.service";
import {WsOrderService} from "./ws-order.service";
import {WsExportService} from "./ws-export.service";
import {WsPresentationService} from "./ws-presentation.service";
import {WsDomainNameReportService} from "./ws-domain-name-report.service";
import {WsScanConfigService} from "./ws-scan-config.service";
import {WsScanPortService} from "./ws-scan-port.service";
import {WsDnsRecordTypeService} from "./ws-dns-record-type.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations:[],
  providers:[
    OrganizationService,
    ApiResponseService,
    WsHttpService,
    AuthService,
    ApiErrorService,
    AccountService,
    AdminService,
    WebServiceService,
    WebServiceScanService,
    QueryHelperService,
    WsNetworkService,
    WsUserService,
    WsDomainNameService,
    WsNetworkServiceService,
    WsSslSupportService,
    WsConversionService,
    WsOrderService,
    WsExportService,
    WsPresentationService,
    WsDomainNameReportService,
    WsScanConfigService,
    WsScanPortService,
    WsDnsRecordTypeService,
  ]
})
export class ApiServicesModule { }
