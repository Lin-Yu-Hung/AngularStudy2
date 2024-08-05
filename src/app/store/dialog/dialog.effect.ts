import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  mergeMap,
  of,
  map,
  concatMap,
  switchMap,
  concat,
} from 'rxjs';
import { DialogActions } from './dialog.action';
import { Category } from './dialog.model';

const { loadSpecificCategory, saveSpecificCategory, setVisable } =
  DialogActions;

@Injectable()
export class DialogEffect {
  private http$ = inject(ApiService);
  private action$ = inject(Actions);
  loadCategory$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadSpecificCategory),

      switchMap((action) => {
        return this.http$.get(action.url).pipe(
          concatMap((res) => {
            return [
              saveSpecificCategory({ data: res.body as Category[] }),
              setVisable({ status: true }),
            ];
          }),
          catchError((err) => {
            if (err.message === 'Request timed out') {
              // 超時處理
              return of();
            } else {
              console.log(err);
              return of();
            }
          }),
        );
      }),
    ),
  );
}
