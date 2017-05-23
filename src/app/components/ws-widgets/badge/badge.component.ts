import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'ws-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.sass']
})
export class BadgeComponent implements OnInit {

  @Input() badgeText: string;
  @Input() badgeIcon: string;
  @Input() iconSide: string = 'left';
  @Input() active: boolean = false;
  @Input() clickable: boolean = true;
  @Input() enabled: boolean = true;
  @Input() marginDistance: number = 5;
  @Input() asBlock: boolean = false;
  @Input() rightText: string;
  @Input() leftText: string;
  @Input() mainTextStyle: any = {
    'font-weight': 'bold',
  };
  @Input() isSuccess: boolean = false;
  @Input() isWarning: boolean = false;
  @Input() isDanger: boolean = false;
  @Input() isSmall: boolean = false;
  @Output() clicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onClick(): void {
    this.clicked.emit(null);
  }

  get margin(): string {
    return this.marginDistance.toString() + 'px';
  }

}
