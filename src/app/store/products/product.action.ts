import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Products } from '../../product/product.model';

export const productActions = createActionGroup({
  source: 'Product',
  events: {
    saveProducts: props<{ products: Products[] }>(),
    saveCategorys: props<{ categorys: string[] }>(),
    loadProducts: props<{ url: string }>(),
    loadCategorys: props<{ url: string }>(),
    loadProductsFailure: emptyProps(),
  },
});
