import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
// import { IncrementAction } from '../store/counter.actions'
import { increment, decrement } from '../store/counter.actions'

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
  standalone: true,
})
export class CounterControlsComponent {
  constructor(private store: Store) {}

  increment() {
    /*increment() -> mert le kell futni, meg kell hívnunk mint egy funciont, hogy elvégezze a szám növelését*/
    this.store.dispatch(increment({value: 2}))
    // this.store.dispatch(new IncrementAction(2));
  }

  decrement() {
    this.store.dispatch(decrement({value: 1}))
  }
}
