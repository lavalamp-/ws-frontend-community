import {Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import {RequirementItem} from "../models/requirement-item.interface";

@Component({
  selector: 'ws-requirements-card',
  templateUrl: './requirements-card.component.html',
  styleUrls: ['./requirements-card.component.sass']
})
export class RequirementsCardComponent implements OnInit, OnChanges {

  private _allMet: boolean;
  @Input() requirements: RequirementItem[] = [];
  @Output() allMetChange = new EventEmitter;

  constructor() { }

  ngOnChanges(): void {
    for (let requirement of this.requirements) {
      if (!requirement.met) {
        this.allMet = false;
        return;
      }
    }
    this.allMet = true;
  }

  ngOnInit() {
  }

  set allMet(newValue: boolean) {
    this._allMet = newValue;
    this.allMetChange.emit(newValue);
  }

}
