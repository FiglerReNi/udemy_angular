import {Directive, effect, inject, input, TemplateRef, ViewContainerRef} from "@angular/core";
import {Permission} from "./auth.model";
import {AuthService} from "./auth.service";

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'});
  private authService = inject(AuthService);
  // az ng templaten belüli tartalomhoz férünk hozzá, amelyiken az appAuth selector van
  private templateRef = inject(TemplateRef);
  // a DOM beli helyét adja meg, hogy hol használjuk a directive-t
  private viewContainerRef = inject(ViewContainerRef)

  constructor() {
    effect(() => {
      if(this.authService.activePermission() === this.userType()) {
        // hova tegyük a dom-ba és mit
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // console.log('showing');
      } else {
        this.viewContainerRef.clear();
        // console.log('hiding');
      }
    })
  }

}
