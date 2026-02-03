import {
  Component, ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  /*mindenhol ahol az app-control selectort használjuk (vagyis hostként ezt a komponentet)
  *ott a control class-t használjuk a css-ből mindenhol, itt nem csak classt adhatunk meg, hanem ol egy eventet is */
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent {
  // a fenti host konfigot helyettesíthetjük így, de a fenti a jobb megoldás
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('clicked');
  // }
  label = input.required<string>()
  // ezzel a host elemhez férünk hozzá, például logokhoz lehet hasznos
  private el = inject(ElementRef)

  onClick() {
    console.log('clicked');
    console.log(this.el);
  }
}
