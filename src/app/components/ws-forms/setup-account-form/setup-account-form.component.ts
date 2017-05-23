import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'ws-setup-account-form',
  templateUrl: './setup-account-form.component.html',
  styleUrls: ['./setup-account-form.component.css']
})
export class SetupAccountFormComponent implements OnInit {

  private setupAccountForm: FormGroup;
  @Input() showLabels: boolean;
  @Output() setupAccountFormChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setupAccountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });
    this.setupAccountForm.valueChanges.subscribe(_ => {
      this.setupAccountFormChange.emit(this.setupAccountForm);
    });
    this.setupAccountFormChange.emit(this.setupAccountForm);

  }

  private onKeyDown(keyEvent: any): void {
    if (keyEvent.keyCode == 13) {
      this.enterPressed.emit(null);
    }
  }

}
