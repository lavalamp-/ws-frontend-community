import { Component } from '@angular/core';
import {WsTitleService} from "./services/ui-services/ws-title.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private titleService: WsTitleService
  ) {
    titleService.init();
  }

  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true
  }

}
