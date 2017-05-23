import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'ws-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.css']
})
export class ForgotPasswordFormComponent implements OnInit {

  private forgotPasswordForm: FormGroup;
  @Input() showLabels: boolean;
  @Output() forgotPasswordFormChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.forgotPasswordForm.valueChanges.subscribe(_ => {
      this.forgotPasswordFormChange.emit(this.forgotPasswordForm);
    });
    this.forgotPasswordFormChange.emit(this.forgotPasswordForm);
  }

  private onKeyDown(keyEvent: any): void {
    if (keyEvent.keyCode == 13) {
      this.enterPressed.emit(null);
    }
  }

}
