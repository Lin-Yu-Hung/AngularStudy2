import { createActionGroup, props } from '@ngrx/store';
import { Products } from '../../product/product.model';

export const DialogActions = createActionGroup({
  source: 'Dialog',
  events: {
    setVisable: props<{ status: boolean }>(),
    setProductInfo: props<{ data: Products }>(),
    setUserDefined: props<{ key: string; obj: { key: string; value: any } }>(),
  },
});
