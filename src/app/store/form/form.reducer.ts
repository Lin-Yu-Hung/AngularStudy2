import { createFeature, createReducer, on } from '@ngrx/store';
import { Products } from '../../product/product.model';
import {
  createFormGroupState,
  FormControlState,
  formGroupReducer,
  FormGroupState,
  setErrors,
  setUserDefinedProperty,
  setValue,
  updateGroup,
  updateRecursive,
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
  price: (controlState, parentState) => {
    const priceLessThanCount = (value: number): ValidationErrors => {
      const count = parentState.controls.rating.value.count;
      return value > count ? { priceTooHigh: true } : {};
    };
    return validate(controlState, (value: number) => {
      return { ...required(value), ...priceLessThanCount(value) };
    });
  },
  category: (state) => ({ ...state, ...validate(required) }),
  description: validate(required),
  rating: updateGroup<Products['rating']>({
    rate: validate(required),
    count: validate(required),
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
    let updateState: ProductFromState;

    updateState = {
      ...state,
      formState: updateGroup<Products>(state.formState, {
        category: (c) => {
          return setErrors(c, { duplicated: true });
          // return setValue('newvalue')(c);
        },
      }),
    };
    return updateState;
  }),
);

// 創建最終的 reducer
export const reducer = (state = initFormState, action: Action) => {
  const productInfoState = ProductInfoReducer(state, action);
  const formState = validateForm(
    formGroupReducer(productInfoState.formState, action),
  );
  console.log(formState);

  return { formState };
};

export const formReducer = createFeature({
  name: 'productForm',
  reducer,
});
