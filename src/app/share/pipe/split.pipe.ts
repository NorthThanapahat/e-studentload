import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(text: string, textSpliter: string,getIndex:number): any {
    let textSplit = text.split(textSpliter)[getIndex];
    return textSplit;
  }

}
