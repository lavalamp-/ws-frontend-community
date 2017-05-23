import { Injectable } from '@angular/core';
import {Organization} from "../api-services/models/organization.class";
import {NetworkService} from "../api-services/models/network-service.interface";
import {Network} from "../api-services/models/network.class";
import {IpAddress} from "../api-services/models/ip-address.interface";

@Injectable()
export class WsCacheService {

  private _cache: any;

  constructor() {
    this._cache = {};
  }

  public cacheIpAddress(ipAddress: IpAddress): void {
    this._cache[ipAddress.uuid] = ipAddress;
  }

  public cacheIpAddresses(ipAddresses: IpAddress[]): void {
    for (let ipAddress of ipAddresses) {
      this.cacheIpAddress(ipAddress);
    }
  }

  public cacheNetwork(network: Network): void {
    this._cache[network.uuid] = network;
  }

  public cacheNetworks(networks: Network[]): void {
    for (let network of networks) {
      this.cacheNetwork(network);
    }
  }

  public cacheNetworkService(networkService: NetworkService): void {
    this._cache[networkService.uuid] = networkService;
  }

  public cacheNetworkServices(networkServices: NetworkService[]): void {
    for (let networkService of networkServices) {
      this.cacheNetworkService(networkService);
    }
  }

  public cacheOrganization(organization: Organization): void {
    this._cache[organization.uuid] = organization;
  }

  public cacheOrganizations(organizations: Organization[]): void {
    for (let organization of organizations) {
      this.cacheOrganization(organization);
    }
  }

  public get(uuid: string): any {
    return this._cache[uuid];
  }

}
