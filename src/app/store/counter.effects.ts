import { createEffect, Actions, ofType } from '@ngrx/effects';
import { increment, decrement, init, set  } from './counter.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';
import { withLatestFrom, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CounterEffects{
  constructor(private actions$: Actions, private store: Store<{counter: number}>) {}
  saveCount = createEffect(() =>
    // ezzel mondjuk meg, hol szeretnénk ezt a side effectet használni
    this.actions$.pipe(
      // ofType('[Counter] Increment'),
      ofType(increment, decrement),
      withLatestFrom(this.store.select(selectCount)),
      tap(([action, counter]) => {
        console.log(action);
        localStorage.setItem('count', counter.toString());
      })
    ), {dispatch: false}
  )

  loadCount = createEffect(() =>
    this.actions$.pipe(
    ofType(init),
    switchMap(() => {
      const storedCounter = localStorage.getItem('count');
      if(storedCounter){
        return of(set({value: +storedCounter}))
      }
     return of(set({value: 0}))
    })
  ))
}
