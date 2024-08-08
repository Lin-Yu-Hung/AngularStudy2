import { createSelector } from '@ngrx/store';
import { ProductInfo } from '../../product/product.model';
import { finalReducer } from '../reducers';

const selectProductsInfo = finalReducer.selectProductInfo;

export const selectProductInfo = createSelector(
  selectProductsInfo,
  (state) => state,
);
export const selectProducts = createSelector(selectProductsInfo, (state) => {
  return state.products;
});
export const selectProductFailure = createSelector(
  selectProductsInfo,
  (state) => state.error,
);
export const selectCategorys = createSelector(
  selectProductsInfo,
  (state) => state.categorys,
);
