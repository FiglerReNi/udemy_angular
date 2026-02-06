import {Component, EventEmitter, Input, model, Output} from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Custom two-way binding
  // @Input({required: true}) size!: { width: string; height: string };
  // ha azt szeretnénk, hogy ez a változó oda vissza működjön, akkor az input nevét kell neki adni + Change
  // utótagot és így ugyanazt az elemet frissíthetjük, amit kiolvastunk az inputtal
  // Ez így egy custom two-way bindig lesz
  // @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();

  //Custom two-way binding, egyszerűbb változat
  size = model.required<{ width: string; height: string }>();

  onReset() {
      // this.sizeChange.emit({
      //   width: '200',
      //   height: '100'
      // });
    this.size.set({ width: '200', height: '100' });
  }
}
