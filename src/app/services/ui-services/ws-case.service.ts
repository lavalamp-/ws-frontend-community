import { Injectable } from '@angular/core';

@Injectable()
export class WsCaseService {

  constructor() { }

  private joinStrings(toJoin: string[], delimiter: string): string {
    return toJoin.map(x => x).join(delimiter);
  }

  private lowerCase(toLower: string): string {
    return toLower.toLowerCase();
  }

  public snakeCaseToStrings(snakeCase: string): string[] {
    return snakeCase.split("_");
  }

  private snakeCaseToTitles(snakeCase: string): string[] {
    let snakeSplit = this.snakeCaseToStrings(snakeCase);
    return this.titleCases(snakeSplit);
  }

  public snakeCaseToSpacedTitleCase(snakeCase: string): string {
    let snakeTitles = this.snakeCaseToTitles(snakeCase);
    return this.joinStrings(snakeTitles, " ");
  }

  public snakeCaseToTitleCase(snakeCase: string): string {
    let snakeTitles = this.snakeCaseToTitles(snakeCase);
    return this.joinStrings(snakeTitles, "");
  }

  public titleCase(toTitle: string): string {
    return toTitle.charAt(0).toUpperCase() + toTitle.slice(1);
  }

  public titleCases(toTitles: string[]): string[] {
    let toReturn = [];
    for (let toTitle of toTitles) {
      toReturn.push(this.titleCase(toTitle));
    }
    return toReturn;
  }

}
