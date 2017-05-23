import {Component, OnInit, Input} from '@angular/core';
import {WebService} from "../../../services/api-services/models/web-service.interface";

@Component({
  selector: 'ws-web-application-technologies',
  templateUrl: './web-application-technologies.component.html',
  styleUrls: ['./web-application-technologies.component.css']
})
export class WebApplicationTechnologiesComponent implements OnInit {

  @Input() webService: WebService;

  private badgeList = [
    {
      label: 'Apache',
      accessor: 'uses_apache',
    },
    {
      label: 'IIS',
      accessor: 'uses_iis',
    },
    {
      label: 'Nginx',
      accessor: 'uses_nginx',
    },
    {
      label: 'Wordpress',
      accessor: 'uses_wordpress',
    },
    {
      label: 'Tomcat Management Portal',
      accessor: 'uses_tomcat_management_portal',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  get noTechFound(): boolean {
    return this.usedBadges.length == 0
  }

  get usedBadges(): any[] {
    let toReturn = [];
    for (let badge of this.badgeList) {
      if (this.webService[badge.accessor]) {
        toReturn.push(badge);
      }
    }
    return toReturn;
  }

}
