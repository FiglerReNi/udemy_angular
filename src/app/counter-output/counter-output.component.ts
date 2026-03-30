import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectCount, selectDoubleCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
  standalone: true,
  imports: [ AsyncPipe ]
})
export class CounterOutputComponent {
  // $-> ezt a jelet használjuk Observable objectek-nél általában
  // mivel ennek observable a típusa ezért ha változik az érték tud változni a ui
  count$: Observable<number>;
  doubleCount$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    // a select után a reducer neve kell, amit a main.ts-ben adtunk neki
    // az érték változására automatikusan tud változni a ui az async pipe-al a html-ben
    // this.count$ = store.select('counter');
    this.count$ = store.select(selectCount);
    this.doubleCount$ = store.select(selectDoubleCount);
  }


}
