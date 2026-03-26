import { Action, createReducer, on } from '@ngrx/store';
// import { CounterActions, INCREMENT } from './counter.actions';
import { increment, decrement } from './counter.actions';

/* bármilyen típus lehet*/
// const initialState = [1,2,3];

const initialState = 0;

//A változat
// export const counterReducer = createReducer(
//   initialState,
//   /*increment -> itt nem kell futtatni, mert nem akarjuk hogy növelje a számot, csak rámutatunk az on-nak,
//   * hogy ezt kell figyelnie, és itt mondjuk meg mi történjen, ha lefut, mi legyen az action*/
//   on(increment, (state) => state + 1)
// );
//
export const counterReducer = createReducer(
  initialState,
  /*increment -> itt nem kell futtatni, mert nem akarjuk hogy növelje a számot, csak rámutatunk az on-nak,
  * hogy ezt kell figyelnie, és itt mondjuk meg mi történjen, ha lefut, mi legyen az action*/
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
);

//B változat
/*mivel ezt a main-be regisztráltuk be és az egész alkalmazás látja ezért bárhol a projektben van action, az
* ide be fog futni, de jelenleg csak az incrementtel foglalkozunk*/
// export function counterReducer(state = initialState, action: CounterActions | Action) {
//   // if (action.type === '[Counter] Increment') {
//   if (action.type === INCREMENT) {
//     // return state + action.value;
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }





