import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ws-topography-type-card',
  templateUrl: './topography-type-card.component.html',
  styleUrls: ['./topography-type-card.component.sass']
})
export class TopographyTypeCardComponent implements OnInit {

  @Input() title: string = 'Title';
  @Input() imageUrl: string = '/assets/web-applications.jpeg';
  @Output() clicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onClick(): void {
    this.clicked.emit(null);
  }

}
