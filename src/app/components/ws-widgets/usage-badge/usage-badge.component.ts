import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'ws-usage-badge',
  templateUrl: './usage-badge.component.html',
  styleUrls: ['./usage-badge.component.css']
})
export class UsageBadgeComponent implements OnInit {

  @Input() term: string;
  @Input() isUsed: boolean;
  @Input() iconSide: string = 'left';
  @Input() active: boolean = true;
  @Input() enabled: boolean = true;
  @Input() clickable: boolean = false;
  @Output() clicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  get icon(): string {
    if (this.isUsed) {
      return 'fa-check-square-o';
    } else {
      return 'fa-square-o';
    }
  }

  private onClick(): void {
    this.clicked.emit(null);
  }

}
