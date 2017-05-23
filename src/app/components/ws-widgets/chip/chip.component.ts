import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'ws-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.sass']
})
export class ChipComponent implements OnInit {

  @Input() text: string = 'Chip';
  @Input() backgroundColor: string = null;

  constructor() { }

  ngOnInit() {
  }

}
