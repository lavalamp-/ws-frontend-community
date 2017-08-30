import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'ws-scan-port-form',
  templateUrl: './scan-port-form.component.html',
  styleUrls: ['./scan-port-form.component.sass']
})
export class ScanPortFormComponent implements OnInit {

  private _formGroup: FormGroup;
  public protocolChoices = ["TCP", "UDP"];
  @Input() formErrors: any;
  @Output() formGroupChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      protocol: ["TCP", Validators.required],
      port_number: ['', Validators.required],
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
    console.log('Form group changed!');
    console.log(newValue);
    this._formGroup = newValue;
    this.formGroupChange.emit(newValue);
  }

}
