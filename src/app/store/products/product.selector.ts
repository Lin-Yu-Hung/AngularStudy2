import { createSelector } from '@ngrx/store';
import { ProductInfo } from '../../product/product.model';

export const selectProductInfo = (state: { productsInfo: ProductInfo }) =>
  state.productsInfo;

export const selectProducts = createSelector(
  selectProductInfo,
  (state) => state.products,
);
export const selectProductFailure = createSelector(
  selectProductInfo,
  (state) => state.error,
);
export const selectCategorys = createSelector(
  selectProductInfo,
  (state) => state.categorys,
);
