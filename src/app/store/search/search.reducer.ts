import { createFeature, createReducer, on } from '@ngrx/store';
import { updateSearchText } from './search.action';

const searchText = '';
export const reducer = createReducer(
  searchText,
  on(updateSearchText, (state, action) => {
    return action.value;
  }),
);

export const searchReducer = createFeature({
  name: 'searchText',
  reducer,
});
