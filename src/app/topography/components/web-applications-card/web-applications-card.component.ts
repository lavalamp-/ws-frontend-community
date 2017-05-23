import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Organization} from "../../../services/api-services/models/organization.class";

@Component({
  selector: 'ws-web-applications-card',
  templateUrl: './web-applications-card.component.html',
  styleUrls: ['./web-applications-card.component.sass']
})
export class WebApplicationsCardComponent implements OnInit {

  @Input() orgUuid: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  private onClicked(): void {
    this.router.navigate(['/topography/' + this.orgUuid + '/web-apps']);
  }

}
