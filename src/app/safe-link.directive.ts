import {Directive, ElementRef, inject, input} from "@angular/core";
import {LogDirective} from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  // ahhonan ezt meghívjuk az a host
  host: {
    '(click)':'onConfirmLeavePage($event)'
  },
  hostDirectives: [LogDirective]
  })
export class SafeLinkDirective {
  // queryParam = input('myapp');
  // appSafeLink = input('myapp');
  queryParam = input('myapp', {alias: 'appSafeLink'});
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('safe link directive');
  }

  onConfirmLeavePage(event: MouseEvent) {
   const wantsToLeave =  window.confirm('Do you want to leave the app?');

   if(wantsToLeave) {
     // const address = (event.target as HTMLAnchorElement).href;
     const address = this.hostElementRef.nativeElement.href;
     this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
     // (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
     // (event.target as HTMLAnchorElement).href = address + '?from=' + this.appSafeLink();
     return;
   }

  event.preventDefault()
  }
}
