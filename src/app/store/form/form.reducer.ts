import { createReducer, on } from '@ngrx/store';
import { Products } from '../../product/product.model';
import {
  createFormGroupState,
  formGroupReducer,
  FormGroupState,
  SetUserDefinedPropertyAction,
  setValue,
  updateGroup,
  validate,
  ValidationErrors,
} from 'ngrx-forms';
import { Action } from '@ngrx/store';
import { DialogActions } from '../dialog/dialog.action';
import { required, maxLength, greaterThan } from 'ngrx-forms/validation';
// ng-form處理
export interface ProductFromState {
  formState: FormGroupState<Products>;
}
// 初始資料
const initForm = createFormGroupState<Products>('ProductForm', {
  id: 0,
  title: '',
  price: 0,
  category: '',
  description: '',
  image: '',
  rating: { rate: '', count: 0 },
});
const priceLessThanCount = (
  priceValue: number,
  countValue: number,
): ValidationErrors => {
  if (priceValue > countValue) {
    return { priceTooHigh: true };
  }
  return {};
};

// 定義驗證規則
const validateForm = updateGroup<Products>({
  title: validate(required),
  price: validate(required, greaterThan(0)),
  category: validate(required),
  description: validate(required),
  rating: updateGroup<Products['rating']>({
    rate: validate(required),
    count: validate(required, greaterThan(0)),
  }),
});

// 組合所有驗證器
const validateFormWithCustom = (state: FormGroupState<Products>) => {
  const updatedState = validateForm(state);
  const customErrors = priceLessThanCount(
    updatedState.controls.price.value,
    updatedState.controls.rating.value.count,
  );
  return {
    ...updatedState,
    errors: { ...updatedState.errors, ...customErrors },
  };
};

export const initFormState: ProductFromState = {
  formState: initForm,
};

const { setProductInfo, setUserDefined } = DialogActions;

// 創建一個基礎 reducer 來處理自定義 actions
const ProductInfoReducer = createReducer(
  initFormState,
  on(setProductInfo, (state, action) => {
    return {
      ...state,
      formState: setValue(state.formState, action.data), // 使用 ngrx-forms 的 setValue 更新表單值
    };
  }),
  on(setUserDefined, (state, { key, obj }) => {
    // 設定userdefinedproperty
    const action = new SetUserDefinedPropertyAction(
      `ProductForm.${key}`,
      obj.key,
      obj.value,
    );
    return {
      ...state,
      formState: formGroupReducer(state.formState, action),
    };
  }),
);

// 創建最終的 reducer
export const ProductInfoFormReducer = (
  state = initFormState,
  action: Action,
) => {
  const productInfoState = ProductInfoReducer(state, action);
  const formState = validateFormWithCustom(
    formGroupReducer(productInfoState.formState, action),
  );
  return { formState };
};
