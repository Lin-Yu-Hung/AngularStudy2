import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../api.service';
import { productActions } from './product.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Products } from '../../product/product.model';
import { HttpErrorResponse } from '@angular/common/http';

const {
  loadProducts,
  loadProductsFailure,
  saveProducts,
  loadCategorys,
  saveCategorys,
} = productActions;

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private http$ = inject(ApiService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts, loadCategorys),
      mergeMap((action) => {
        if (action.type === '[Product] loadProducts') {
          return this.http$.get<Products[]>(action.url).pipe(
            map((response) => saveProducts({ products: response.body || [] })),
            catchError((err) => {
              console.dir(err.message);
              return of(loadProductsFailure());
            }),
          );
        } else {
          // category
          return this.http$.get<string[]>(action.url).pipe(
            map((response) =>
              saveCategorys({ categorys: response.body || [] }),
            ),
            catchError((err: HttpErrorResponse) => {
              // console.log(err);
              return of(saveCategorys({ categorys: [] }));
            }),
          );
        }
      }),
    ),
  );
}
