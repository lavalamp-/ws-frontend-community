import { Component, OnInit } from '@angular/core';
import {flyInOut} from "../../animations";

@Component({
  selector: 'ws-forgot-password-sent-page',
  templateUrl: './forgot-password-sent-page.component.html',
  styleUrls: ['./forgot-password-sent-page.component.css'],
  host: {
    '[@flyInOut]': 'true'
  },
  animations: [
    flyInOut,
  ],
  styles: [':host { width: 100% }']
})
export class ForgotPasswordSentPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
