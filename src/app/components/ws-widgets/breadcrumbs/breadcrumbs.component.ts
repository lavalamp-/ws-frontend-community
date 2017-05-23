import {Component, OnInit, Input} from '@angular/core';
import {Breadcrumb} from "../../../services/ui-services/models/breadcrumb";

@Component({
  selector: 'ws-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadcrumbs: Breadcrumb[];

  constructor() { }

  ngOnInit() {
    this.breadcrumbs = []
  }

}
