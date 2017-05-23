import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {fadeInOut} from "../animations";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'ws-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
  host: {
    '[@fadeInOut]': 'true'
  },
  animations: [
    fadeInOut
  ],
  styles: [':host { width: 100%; }']
})
export class GreetingComponent implements OnInit {

  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
  }

}
