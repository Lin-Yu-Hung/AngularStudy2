import { createSelector } from '@ngrx/store';
import { finalReducer } from '../reducers';

const selectSearch = finalReducer.selectSearchText;

export const selectorSearchText = createSelector(selectSearch, (s) => s);
