import {Component, input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  /*mindenhol ahol az app-control selectort használjuk (vagyis hostként ezt a komponentet)
  *ott a control class-t használjuk a css-ből mindenhol */
  host: {
    class: 'control',
  }
})
export class ControlComponent {
  label = input.required<string>()
}
