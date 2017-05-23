import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ws-ssl-support-card',
  templateUrl: './ssl-support-card.component.html',
  styleUrls: ['./ssl-support-card.component.sass']
})
export class SslSupportCardComponent implements OnInit {

  @Input() orgUuid: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  private onClicked(): void {
    this.router.navigate(['/topography/' + this.orgUuid + '/ssl-support']);
  }

}
