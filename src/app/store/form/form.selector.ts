import { createSelector } from '@ngrx/store';
import { ProductFromState } from './form.reducer';
import { finalReducer } from '../reducers';

const selectProductForm = finalReducer.selectProductForm;

export const selectForm = createSelector(selectProductForm, (s) => s.formState);
