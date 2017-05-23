import { Injectable } from '@angular/core';

@Injectable()
export class WsColorService {

  private baseRed: number = 67;
  private baseGreen: number = 200;
  private baseBlue: number = 244;
  private maxRange: number = 0.25;

  constructor() { }

  private interpolateRange(startValue: number, endValue: number, count: number, truncate: boolean = true): number[] {
    let step = (endValue - startValue) / (count - 1);
    let toReturn = [];
    let currentValue = null;
    for (let i = 0; i < count; i++) {
      currentValue = startValue + (i * step);
      if (truncate) {
        currentValue = Math.floor(currentValue);
      }
      toReturn.push(currentValue);
    }
    return toReturn;
  }

  private rgbToCssString(red: number, green: number, blue: number): string {
    return 'rgb(' + red.toString() + ', ' + green.toString() + ', ' + blue.toString() + ')';
  }

  public getColorPaletteOfLength(length: number = 1): string[] {
    let colors = [];
    if (length == 1) {
      colors.push([this.baseRed, this.baseGreen, this.baseBlue]);
    } else {
      let blues = this.interpolateRange(this.blueStart, this.blueEnd, length);
      let greens = this.interpolateRange(this.greenStart, this.greenEnd, length);
      let reds = this.interpolateRange(this.redStart, this.redEnd, length);
      for (let i = 0; i < length; i++) {
        colors.push([reds[i], greens[i], blues[i]]);
      }
    }
    let toReturn = [];
    for (let colorTriple of colors) {
      toReturn.push(this.rgbToCssString(colorTriple[0], colorTriple[1], colorTriple[2]));
    }
    return toReturn;
  }

  get blueStart(): number {
    return this.baseBlue - (this.baseBlue * this.maxRange);
  }

  get greenStart(): number {
    return this.baseGreen - (this.baseGreen * this.maxRange);
  }

  get redStart(): number {
    return this.baseRed - (this.baseRed * this.maxRange);
  }

  get blueEnd(): number {
    return this.baseBlue + ((255 - this.baseBlue) * this.maxRange);
  }

  get greenEnd(): number {
    return this.baseGreen + ((255 - this.baseGreen) * this.maxRange);
  }

  get redEnd(): number {
    return this.baseRed + ((255 - this.baseRed) * this.maxRange);
  }

}
