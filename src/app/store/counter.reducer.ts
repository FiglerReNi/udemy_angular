import { createReducer } from '@ngrx/store';

/* bármilyen típus lehet*/
// const initialState = [1,2,3];

const initialState = 0;

//A változat
// export const counterReducer = createReducer(
//   initialState
// );

//B változat
export function counterReducer(state = initialState) {
  return initialState;
}





