import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ws-domain-name-card',
  templateUrl: './domain-name-card.component.html',
  styleUrls: ['./domain-name-card.component.sass']
})
export class DomainNameCardComponent implements OnInit {

  @Input() orgUuid: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onClicked(): void {
    this.router.navigate(['/topography/' + this.orgUuid + '/domain-names']);
  }

}
