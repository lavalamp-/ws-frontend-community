import {Component, OnInit, Input} from '@angular/core';
import {ErrorField} from "../models/error-field.interface";

@Component({
  selector: 'ws-input-hint',
  templateUrl: './input-hint.component.html',
  styleUrls: ['./input-hint.component.css']
})
export class InputHintComponent implements OnInit {

  @Input() hintType: string = 'danger';
  @Input() messages: ErrorField[] = [];

  constructor() { }

  ngOnInit() {
  }

  get textClass(): string {
    return 'text-' + this.hintType;
  }

}
