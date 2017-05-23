import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ws-export-options',
  templateUrl: './export-options.component.html',
  styleUrls: ['./export-options.component.sass']
})
export class ExportOptionsComponent implements OnInit {

  @Output() exportSelected = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  private onExportClicked(): void {
    this.exportSelected.emit(null);
  }

}
