import { cartReducer } from './cart/cart';
import { DialogReducer } from './dialog/dialog.reducer';
import { ProductReducer } from './products/product.reducer';
import { searchReducer } from './search/search.reducer';
import { formReducer } from './form/form.reducer';
import { combineReducers, createFeature } from '@ngrx/store';

export const reducers = combineReducers({
  [formReducer.name]: formReducer.reducer,
  [searchReducer.name]: searchReducer.reducer,
  [ProductReducer.name]: ProductReducer.reducer,
  carts: cartReducer,
  [DialogReducer.name]: DialogReducer.reducer,
});
export const finalReducer = createFeature({
  name: 'reducer',
  reducer: reducers,
});
