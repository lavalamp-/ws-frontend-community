import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ws-count-badge',
  templateUrl: './count-badge.component.html',
  styleUrls: ['./count-badge.component.css']
})
export class CountBadgeComponent implements OnInit {

  @Input() term: string;
  @Input() count: number;
  @Input() active: boolean = false;
  @Input() enabled: boolean = true;
  @Input() clickable: boolean = true;
  @Input() mainTextStyle: any = {
    'font-weight': 'bold',
  };
  @Input() asBlock: boolean = false;
  @Input() marginDistance: number = 5;
  @Output() clicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onClick(): void {
    this.clicked.emit(null);
  }

  get countText(): string {
    return '(' + this.count + ')';
  }

}
