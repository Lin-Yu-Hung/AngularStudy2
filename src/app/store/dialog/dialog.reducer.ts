import { createReducer, on } from '@ngrx/store';
import { Products } from '../../product/product.model';
import { DialogActions } from './dialog.action';

export interface Dialog {
  visable: boolean;
  productInfo: Products | {};
}

const initState: Dialog = {
  visable: false,
  productInfo: {},
};

const { setVisable } = DialogActions;
export const DialogReducer = createReducer(
  initState,
  on(setVisable, (state, action) => {
    return {
      ...state,
      visable: action.status,
    };
  }),
);
