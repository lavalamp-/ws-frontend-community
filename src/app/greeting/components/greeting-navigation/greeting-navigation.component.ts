import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'ws-greeting-navigation',
  templateUrl: './greeting-navigation.component.html',
  styleUrls: ['./greeting-navigation.component.sass']
})
export class GreetingNavigationComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
