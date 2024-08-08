import { createFeature, createReducer, on } from '@ngrx/store';
import { productActions } from './product.action';
import { ProductInfo } from '../../product/product.model';

const initialState: ProductInfo = {
  products: [],
  categorys: [],
  error: false,
};
const { saveProducts, loadProductsFailure, saveCategorys } = productActions;
const reducer = createReducer(
  // api回傳後修改products
  initialState,
  on(saveProducts, (state, action) => {
    return { ...state, products: action.products };
  }),
  on(loadProductsFailure, (state) => {
    return { ...state, error: true };
  }),
  on(saveCategorys, (state, action) => {
    return { ...state, categorys: action.categorys };
  }),
);

export const ProductReducer = createFeature({
  name: 'productInfo',
  reducer,
});
