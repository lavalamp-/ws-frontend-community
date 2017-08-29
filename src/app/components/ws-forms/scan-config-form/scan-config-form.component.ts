import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'ws-scan-config-form',
  templateUrl: './scan-config-form.component.html',
  styleUrls: ['./scan-config-form.component.sass']
})
export class ScanConfigFormComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private _formGroup: FormGroup;
  @Input() formErrors: any;
  @Output() formGroupChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      scan_domain_names: [true],
      scan_network_ranges: [true],
      scan_ip_addresses: [true],
      scan_network_services: [true],
      scan_ssl_support: [true],
      dns_enumerate_subdomains: [true],
      dns_scan_resolutions: [true],
      network_scan_bandwidth: ['10M'],
      network_inspect_live_hosts: [true],
      ip_address_geolocate: [true],
      ip_address_reverse_hostname: [true],
      ip_address_historic_dns: [true],
      ip_address_as_data: [true],
      ip_address_whois_data: [true],
      network_service_check_liveness: [true],
      network_service_fingerprint: [true],
      network_service_inspect_app: [true],
      ssl_enumerate_vulns: [true],
      ssl_enumerate_cipher_suites: [true],
      ssl_retrieve_cert: [true],
      app_inspect_web_app: [true],
      web_app_include_http_on_https: [true],
      web_app_enum_vhosts: [true],
      web_app_take_screenshot: [true],
      web_app_do_crawling: [true],
      web_app_enum_user_agents: [true],
    });
    // this.subscriptions.push(this.formGroup.valueChanges.subscribe(formGroup => this.formGroup = formGroup));
    console.log(this.formGroup)
  }

  private onKeyDown(keyEvent: any): void {
    if (keyEvent.keyCode == 13) {
      this.enterPressed.emit(null);
    }
  }

  @Input()
  get formGroup(): FormGroup {
    return this._formGroup;
  }

  set formGroup(newValue: FormGroup) {
    console.log('Form group changed!');
    console.log(newValue);
    this._formGroup = newValue;
    this.formGroupChange.emit(newValue);
  }

}
