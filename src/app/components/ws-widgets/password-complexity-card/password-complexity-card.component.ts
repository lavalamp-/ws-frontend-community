import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RequirementItem} from "../models/requirement-item.interface";
import {WsStringHelperService} from "../../../services/data-services/ws-string-helper.service";

@Component({
  selector: 'ws-password-complexity-card',
  templateUrl: './password-complexity-card.component.html',
  styleUrls: ['./password-complexity-card.component.sass']
})
export class PasswordComplexityCardComponent implements OnInit {

  @Input() minLength: number;
  @Input() minSpecial: number;
  @Input() minUpperCase: number;
  @Input() password: string;
  @Input() passwordRepeated: string;
  @Output() allMetChange = new EventEmitter;

  constructor(
    private stringHelper: WsStringHelperService,
  ) { }

  ngOnInit() {
  }

  get requirements(): RequirementItem[] {
    let toReturn = [];
    if (this.minLength != null) {
      toReturn.push({
        met: this.password != null ? this.password.length >= this.minLength : false,
        description: 'Must be at least ' + this.minLength.toString() + ' characters long'
      });
    }
    if (this.minUpperCase != null) {
      toReturn.push({
        met: this.password != null ? this.stringHelper.countUpperCase(this.password) >= this.minUpperCase : false,
        description: 'Must have at least ' + this.minUpperCase.toString() + ' upper-case characters'
      });
    }
    if (this.minSpecial != null) {
      toReturn.push({
        met: this.password != null ? this.stringHelper.countSpecial(this.password) >= this.minSpecial : false,
        description: 'Must have at least ' + this.minSpecial + ' special characters'
      });
    }
    if (!this.password || !this.passwordRepeated) {
      toReturn.push({
        met: false,
        description: 'Entered passwords must match'
      });
    }
    else {
      toReturn.push({
        met: this.password == this.passwordRepeated,
        description: 'Entered passwords must match'
      });
    }
    return toReturn;
  }

  private onAllMetChanged(newValue: boolean): void {
    this.allMetChange.emit(newValue);
  }

}
