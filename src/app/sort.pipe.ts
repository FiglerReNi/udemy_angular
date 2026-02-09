import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'sort',
  standalone: true,
  //ezzel kikapcsoljuk a cache-t, és így mindig lefut, ha bármi bárhol változik a template részen amire hat, például
  // kattintunk egyet, függetlenül attól amúgy szükséges lenne-e vagy sem.
  // Viszont ez performanicia szempontból nem túl jó
  pure: false
})
export class SortPipe implements PipeTransform{
  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    // átmásoljuk a value-t a sorted-be
    const sorted = [...value];
    sorted.sort((a, b) => {
      if(direction === 'asc') {
        return a > b ? 1 : -1
      } else {
        return a > b ? -1 : 1
      }
    })
    console.log(sorted)
    return sorted;
  }
}
