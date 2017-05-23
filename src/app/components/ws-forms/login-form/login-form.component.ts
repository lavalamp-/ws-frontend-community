import {Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'ws-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: []
})


export class LoginFormComponent implements OnInit {

  private loginForm: FormGroup;
  @Input() showLabels: boolean;
  @Output() loginFormChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm.valueChanges.subscribe(_ => {
      this.loginFormChange.emit(this.loginForm);
    });
    this.loginFormChange.emit(this.loginForm);
  }

  onFormKeyDown(pressEvent: any): void {
    if (pressEvent.keyCode == 13) {
      this.enterPressed.emit(null);
    }
  }

}
