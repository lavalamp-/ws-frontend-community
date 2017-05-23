import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ws-preformatted-panel',
  templateUrl: './preformatted-panel.component.html',
  styleUrls: ['./preformatted-panel.component.sass']
})
export class PreformattedPanelComponent implements OnInit {

  @Input() panelBody: string;
  @Input() title: string = 'Title';
  @Input() fontSize: number = 13;

  constructor() { }

  ngOnInit() {
  }

  get fontSizeStyle(): string {
    return this.fontSize + 'px';
  }

}
