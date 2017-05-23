import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ws-check-badge',
  templateUrl: './check-badge.component.html',
  styleUrls: ['./check-badge.component.css']
})
export class CheckBadgeComponent implements OnInit {

  @Input() badgeText: string;
  @Input() successful: boolean;
  @Input() isSmall: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
