import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ws-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {

  @Input() enabled: boolean = false;
  @Input() size: string = 'fa-2x';
  @Input() width: number;

  constructor() { }

  ngOnInit() {
  }

  get hasWidth(): boolean {
    return this.width != null;
  }

  get pixelWidth(): string {
    return this.width.toString() + 'px';
  }

  get widthString(): string {
    return this.hasWidth ? this.pixelWidth : 'auto';
  }

}
