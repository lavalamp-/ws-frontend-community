import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'ws-network-form',
  templateUrl: './network-form.component.html',
  styleUrls: ['./network-form.component.css']
})
export class NetworkFormComponent implements OnInit {

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
      mask_length: ['', Validators.required],
      address: ['', Validators.required],
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
