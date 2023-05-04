import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  standalone: true,
  name: 'nameFormatter'
})
export class ComponentNameFormatterPipe implements PipeTransform {
  transform(name: string) {
    if(!name) return null;
    if(name.includes('app')) return name;

    return `app-${name}`;
  }
}
