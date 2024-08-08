import {
  createAction,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Carts } from '../../cart/cart.model';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { finalReducer } from '../reducers';

// actions
const saveCarts = createAction('[Cart] saveCarts', props<{ carts: Carts[] }>());
export const loadCarts = createAction(
  '[Cart] loadCarts',
  props<{ url: string }>(),
);

// selector

// reducer
const initialState: Carts[] = [];
export const cartReducer = createReducer(
  initialState,
  on(saveCarts, (state, action) => action.carts), // 儲存carts
);

// effects
@Injectable()
export class CartEffects {
  private http$ = inject(ApiService);
  private action$ = inject(Actions);

  loadCart$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadCarts),
      mergeMap((action) =>
        this.http$.get(action.url).pipe(
          map((res) => saveCarts({ carts: res.body as Carts[] })),
          catchError(() => of()),
        ),
      ),
    ),
  );
}
