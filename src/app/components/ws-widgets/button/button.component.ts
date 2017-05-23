import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ws-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {

  @Input() text: string = 'Button';
  @Input() disabled: boolean = false;
  @Input() color: string = 'primary';
  @Input() width: number;
  @Input() asBlock: boolean = false;
  @Output() buttonClicked = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onButtonClicked(): void {
    this.buttonClicked.emit(null);
  }

  get isDisabled(): boolean {
    return this.disabled;
  }

  get widthStyle(): string {
    if (this.width) {
      return this.width.toString() + 'px';
    } else {
      return 'auto';
    }
  }

}
