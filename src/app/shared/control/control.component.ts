import {
  AfterContentInit, afterEveryRender, afterNextRender,
  AfterViewInit,
  Component, contentChild, ContentChild, ElementRef,
  HostBinding,
  HostListener,
  inject,
  input, OnInit,
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
export class ControlComponent implements AfterContentInit {
  // a fenti host konfigot helyettesíthetjük így, de a fenti a jobb megoldás
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick() {
  //   console.log('clicked');
  // }
  label = input.required<string>()
  // ezzel a host elemhez férünk hozzá, például logokhoz lehet hasznos
  private el = inject(ElementRef)
  // #input elemet keres
  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private control = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');

  constructor() {
    // A példányosítás után, az angulat renderel, és amikor ez kész és kirajzolta a DOM-ot, majd utána bármikor
    // amikor változik a view és újrarajzol lefut
    afterEveryRender(() => console.log('every render'))
    // egyszer fut, renderelés után
    afterNextRender(() => console.log('next render'))
  }

  onClick() {
    console.log('clicked');
    console.log(this.el);
    // console.log(this.control);
    console.log(this.control());
  }

  ngAfterContentInit(): void {
    console.log('after content init');
  }
}
