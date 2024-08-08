import { createSelector } from '@ngrx/store';
import { finalReducer } from '../reducers';

const selectCartsItem = finalReducer.selectCarts;
export const selectCarts = createSelector(selectCartsItem, (s) => s);
