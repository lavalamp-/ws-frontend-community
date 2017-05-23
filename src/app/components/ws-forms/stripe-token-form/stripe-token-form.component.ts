import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'ws-stripe-token-form',
  templateUrl: './stripe-token-form.component.html',
  styleUrls: ['./stripe-token-form.component.sass']
})
export class StripeTokenFormComponent implements OnInit {

  private _formGroup: FormGroup;
  @Input() formErrors: any;
  @Input() yearsInFuture: any = 20;
  @Input() ccError: string;
  @Input() cvcError: string;
  @Input() monthError: string;
  @Input() yearError: string;
  @Input() genericError: string;
  @Output() formGroupChange = new EventEmitter;
  @Output() enterPressed = new EventEmitter;

  private months = [
    {
      number: '01',
      label: '01 - January',
    },
    {
      number: '02',
      label: '02 - February',
    },
    {
      number: '03',
      label: '03 - March',
    },
    {
      number: '04',
      label: '04 - April',
    },
    {
      number: '05',
      label: '05 - May',
    },
    {
      number: '06',
      label: '06 - June',
    },
    {
      number: '07',
      label: '07 - July',
    },
    {
      number: '08',
      label: '08 - August',
    },
    {
      number: '09',
      label: '09 - September',
    },
    {
      number: '10',
      label: '10 - October',
    },
    {
      number: '11',
      label: '11 - November',
    },
    {
      number: '12',
      label: '12 - December',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      paymentName: [''],
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvc: ['', Validators.required],
    })
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

  get years(): number[] {
    let thisYear = new Date().getFullYear();
    let toReturn = [thisYear];
    for (let i = 1; i < this.yearsInFuture + 1; i++) {
      toReturn.push(thisYear + i);
    }
    return toReturn;
  }

}
