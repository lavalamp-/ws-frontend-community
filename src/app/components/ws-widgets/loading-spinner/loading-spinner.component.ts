import { Component, OnInit } from '@angular/core';
import { fadeInOutNoDelay} from "../../../animations";

@Component({
  selector: 'ws-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css'],
  host: {
    '[@fadeInOutNoDelay]': 'true'
  },
  animations: [
    fadeInOutNoDelay
  ],
  styles: [':host { position: fixed; top: 0; right: 0; }']
})
export class LoadingSpinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
