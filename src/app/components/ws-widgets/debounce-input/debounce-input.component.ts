import {Component, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'ws-debounce-input',
  templateUrl: './debounce-input.component.html',
  styleUrls: ['./debounce-input.component.sass']
})
export class DebounceInputComponent implements OnInit, OnDestroy {

  private formControl: FormControl;
  private subscriptions: Subscription[] = [];
  @Input() value: string;
  @Input() placeholder: string = 'Placeholder';
  @Input() debounceDuration: number = 500;
  @Output() valueChanges = new EventEmitter;

  constructor() { }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.formControl = new FormControl();
    this.formControl.setValue(this.value);
    this.subscriptions.push(this.formControl.valueChanges.debounceTime(this.debounceDuration).subscribe(term => this.valueChanges.emit(this.formControl.value)));
  }

}
