import { createSelector } from '@ngrx/store';
import { ProductFromState } from './form.reducer';

const selectForm = (state: { productForm: ProductFromState }) =>
  state.productForm;

export const selectFromState = createSelector(
  selectForm,
  (state) => state.formState,
);
