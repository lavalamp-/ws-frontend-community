import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ws-ul-panel',
  templateUrl: './ul-panel.component.html',
  styleUrls: ['./ul-panel.component.sass']
})
export class UlPanelComponent implements OnInit {

  @Input() rows: string[] = [];
  @Input() title: string = 'Title';

  constructor() { }

  ngOnInit() {
  }

}
