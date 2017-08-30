import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'ws-dns-record-type-form',
  templateUrl: './dns-record-type-form.component.html',
  styleUrls: ['./dns-record-type-form.component.sass']
})
export class DnsRecordTypeFormComponent implements OnInit {

  private _formGroup: FormGroup;
  public typeChoices = [
    'A',
    'A6',
    'AAAA',
    'AFSDB',
    'APL',
    'ATMA',
    'AXFR',
    'CAA',
    'CDNSKEY',
    'CDS',
    'CERT',
    'CNAME',
    'DHCID',
    'DLV',
    'DNAME',
    'DNSKEY',
    'DS',
    'EID',
    'GID',
    'GPOS',
    'HINFO',
    'HIP',
    'IPSECKEY',
    'ISDN',
    'IXFR',
    'KEY',
    'KX',
    'LOC',
    'MAILA',
    'MAILB',
    'MB',
    'MD',
    'MF',
    'MG',
    'MINFO',
    'MR',
    'MX',
    'NAPTR',
    'NB',
    'NBSTAT',
    'NIMLOC',
    'NS',
    'NSAP',
    'NSAP-PTR',
    'NSEC',
    'NSEC3',
    'NSEC3PARAM',
    'NULL',
    'NXT',
    'OPT',
    'PTR',
    'PX',
    'RP',
    'RRSIG',
    'RT',
    'SIG',
    'SINK',
    'SOA',
    'SPF',
    'SRV',
    'SSHFP',
    'TA',
    'TKEY',
    'TLSA',
    'TSIG',
    'TXT',
    'UID',
    'UINFO',
    'UNSPEC',
    'URI',
    'WKS',
    'X25'
  ];
  @Input() formErrors: any;
  @Output() formGroupChange = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      record_type: ['A'],
    });
  }

  @Input()
  get formGroup(): FormGroup {
    return this._formGroup;
  }

  set formGroup(newValue: FormGroup) {
    this._formGroup = newValue;
    this.formGroupChange.emit(newValue);
  }

}
