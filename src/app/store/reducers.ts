import { cartReducer } from './cart/cart';
import { DialogReducer } from './dialog/dialog.reducer';
import { ProductReducer } from './products/product.reducer';
import { searchReducer } from './search/search.reducer';
import { ProductInfoFormReducer } from './form/form.reducer';

export const reducers = {
  searchText: searchReducer,
  productsInfo: ProductReducer,
  carts: cartReducer,
  dialog: DialogReducer,
  productForm: ProductInfoFormReducer,
};
