import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "selectFive"
})
export class SelectFivePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value && value.length >= 0) {
      if (value.length <= 5) {
        return value;
      }
      let [one, two, three, four, five] = value;
      return [one, two, three, four, five];
    }
    return [];
  }
}
