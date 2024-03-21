import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(value: string, maxLengh:number =20, ellipsis: string = "..."): unknown {
    if(value.length > maxLengh){
      return value.slice(0, maxLengh) + ellipsis;
    }
    return value;
  }

}
