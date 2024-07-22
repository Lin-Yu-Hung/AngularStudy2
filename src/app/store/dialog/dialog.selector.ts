import { createSelector } from '@ngrx/store';
import { Dialog } from './dialog.reducer';

const selectDialog = (state: { dialog: Dialog }) => state.dialog;

export const selectDialogVistable = createSelector(
  selectDialog,
  (state: Dialog) => state.visable,
);
export const selectDialogProductInfo = createSelector(
  selectDialog,
  (state: Dialog) => state.productInfo,
);
