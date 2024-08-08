import { createSelector } from '@ngrx/store';
import { finalReducer } from '../reducers';

const selectDialog = finalReducer.selectDialogReducer;

export const selectDialogVistable = createSelector(
  selectDialog,
  (state) => state.visable,
);
export const selectDialogProductInfo = createSelector(
  selectDialog,
  (state) => state.productInfo,
);
export const selectSpecificCategory = createSelector(
  selectDialog,
  (state) => state.specificCategory,
);
