import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DetailItem} from "../models/detail-item.interface";

@Component({
  selector: 'ws-preformatted-list-panel',
  templateUrl: './preformatted-list-panel.component.html',
  styleUrls: ['./preformatted-list-panel.component.sass']
})
export class PreformattedListPanelComponent implements OnInit {

  @Input() detailItems: DetailItem[] = [];
  @Input() horizontal: boolean = true;
  @Input() panelBody: string;
  @Input() title: string = 'Title';
  @Input() fontSize: number = 13;
  @Input() showFilters: boolean = true;
  @Input() wordBreak: string = 'normal';
  @Output() filterCreated = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  get fontSizeStyle(): string {
    return this.fontSize + 'px';
  }
}
