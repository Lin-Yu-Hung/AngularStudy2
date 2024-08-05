import { createSelector } from '@ngrx/store';
import { Dialog } from './dialog.model';

const selectDialog = (state: { dialog: Dialog }) => state.dialog;

export const selectDialogVistable = createSelector(
  selectDialog,
  (state: Dialog) => state.visable,
);
export const selectDialogProductInfo = createSelector(
  selectDialog,
  (state: Dialog) => state.productInfo,
);
export const selectSpecificCategory = createSelector(
  selectDialog,
  (state: Dialog) => state.specificCategory,
);
