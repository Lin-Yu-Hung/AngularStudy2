import { createAction, props } from '@ngrx/store';

export const updateSearchText = createAction(
  '[Search] search',
  props<{ value: string }>()
);
