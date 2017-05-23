import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'ws-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  private signUpForm: FormGroup;
  @Input() showLabels: boolean;
  @Output() signUpFormChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });
    this.signUpForm.valueChanges.subscribe(_ => {
      this.signUpFormChange.emit(this.signUpForm);
    });
    this.signUpFormChange.emit(this.signUpForm);
  }

  private onKeyDown(keyEvent: any): void {
    if (keyEvent.keyCode == 13) {
      this.enterPressed.emit(null);
    }
  }

}
