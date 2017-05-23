import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'ws-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  private _formGroup: FormGroup;
  @Input() formErrors: any;
  @Output() formGroupChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      newPassword: ['', Validators.required],
      newPasswordRepeat: ['', Validators.required],
    });
  }

  private onKeyDown(event: any): void {
    if (event.keyCode == 13) {
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
