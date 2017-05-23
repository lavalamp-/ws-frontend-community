import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SelectItem} from "./select-item.interface";

@Component({
  selector: 'ws-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent implements OnInit {

  private _selectedIndex: number;
  @Input() disabled: boolean = false;
  @Input() selectItems: SelectItem[] = [];
  @Input() placeholder: string = 'Placeholder';
  @Input() inputSelectedIndex: number;
  @Output() itemSelected = new EventEmitter;

  constructor() { }

  ngOnInit() {
    if (this.inputSelectedIndex) {
      this._selectedIndex = this.inputSelectedIndex;
    }
  }

  get isDisabled(): boolean {
    return this.disabled || this.selectItems.length == 0;
  }

  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(newValue: number) {
    this._selectedIndex = newValue;
    this.itemSelected.emit([newValue, this.selectItems[newValue].field, this.selectItems[newValue].label]);
  }

}
