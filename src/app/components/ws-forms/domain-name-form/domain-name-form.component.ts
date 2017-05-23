import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'ws-domain-name-form',
  templateUrl: './domain-name-form.component.html',
  styleUrls: ['./domain-name-form.component.css']
})
export class DomainNameFormComponent implements OnInit {

  private _formGroup: FormGroup;
  @Input() formErrors: any;
  @Output() formGroupChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  private onKeyDown(keyEvent: any): void {
    if (keyEvent.keyCode == 13) {
      this.enterPressed.emit(null);
    }
  }

  @Input()
  get formGroup(): FormGroup {
    return this._formGroup;
  }

  set formGroup(newValue: FormGroup) {
    this._formGroup = newValue;
    this.formGroupChange.emit(newValue);
  }

}
