import { createReducer, on } from '@ngrx/store';
import { Products } from '../../product/product.model';
import {
  createFormGroupState,
  FormControlState,
  formGroupReducer,
  FormGroupState,
  setUserDefinedProperty,
  setValue,
  updateGroup,
  validate,
  ValidationErrors,
} from 'ngrx-forms';
import { Action } from '@ngrx/store';
import { DialogActions } from '../dialog/dialog.action';
import { required, greaterThan } from 'ngrx-forms/validation';

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
  state: FormGroupState<Products>,
): ValidationErrors => {
  const price = state.controls.price.value;
  const count = state.controls.rating.value.count;
  return price > count ? { priceTooHigh: true } : {};
};
const validText = (num: number, text: string) => {
  if (text.length > num) {
    return { textToohigh: true };
  }
  return {};
};

// 定義驗證規則
const validateForm = updateGroup<Products>({
  title: (inputeState) => {
    let updatedState = validate(inputeState, (inputValue) => {
      return { ...required(inputValue), ...validText(10, inputValue) }; // 將值丟進required、maxLength驗證
    });
    return updatedState;
  },
  price: (inputState, parentState) => {
    let updatedState: FormControlState<number>;
    updatedState = validate(inputState, (inputValue) => {
      return { ...required(inputValue), ...priceLessThanCount(parentState) };
    });
    return updatedState;
  },
  category: validate(required),
  description: validate(required),
  rating: updateGroup<Products['rating']>({
    rate: validate(required),
    count: validate(required, greaterThan(0)),
  }),
});

export const initFormState: ProductFromState = {
  formState: validateForm(initForm),
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
    let updatedState: ProductFromState;
    updatedState = {
      ...state,
      formState: updateGroup<Products>(state.formState, {
        [key]: setUserDefinedProperty(obj.key, obj.value),
        rating: updateGroup<Products['rating']>({
          rate: setUserDefinedProperty(obj.key, obj.value),
        }),
      }),
    };
    // updatedState.formState = setUserDefinedProperty(
    //   updatedState.formState,
    //   obj.key,
    //   obj.value,
    // );
    return updatedState;
  }),
);

// 創建最終的 reducer
export const ProductInfoFormReducer = (
  state = initFormState,
  action: Action,
) => {
  const productInfoState = ProductInfoReducer(state, action);
  const formState = validateForm(
    formGroupReducer(productInfoState.formState, action),
  );
  return { formState };
};
