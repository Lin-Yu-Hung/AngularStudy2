import { createReducer, on } from '@ngrx/store';
import { updateSearchText } from './search.action';

const searchText = '';
export const searchReducer = createReducer(
  searchText,
  on(updateSearchText, (state, action) => {
    return action.value;
  })
);
