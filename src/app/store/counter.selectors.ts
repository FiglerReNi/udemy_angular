import { createSelector } from '@ngrx/store';

export const selectCount = (state: {counter: number} ) => state.counter;
// export const selectDoubleCount = (state: {counter:number}) => state.counter *2;
// lefuttatja a selectCountot és a visszatérő érték lesz a state a kövi sorban
export const selectDoubleCount = createSelector(
  selectCount,
  (state) => state *2
);
