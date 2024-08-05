import { createReducer, on } from '@ngrx/store';
import { DialogActions } from './dialog.action';
import { Dialog } from './dialog.model';

const initState: Dialog = {
  visable: false,
  productInfo: {},
  specificCategory: [],
};

const { setVisable, saveSpecificCategory } = DialogActions;
export const DialogReducer = createReducer(
  initState,
  on(setVisable, (state, action) => {
    return {
      ...state,
      visable: action.status,
    };
  }),
  on(saveSpecificCategory, (state, action) => {
    return {
      ...state,
      specificCategory: action.data,
    };
  }),
);
