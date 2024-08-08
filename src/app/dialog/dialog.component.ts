import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  throwError,
} from 'rxjs';
import {
  selectDialogVistable,
  selectSpecificCategory,
} from '../store/dialog/dialog.selector';
import { selectForm } from '../store/form/form.selector';
import { Store } from '@ngrx/store';
import { Product, Products } from '../product/product.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { DialogActions } from '../store/dialog/dialog.action';
import { selectCategorys } from '../store/products/product.selector';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Category } from '../store/dialog/dialog.model';
import { TableModule } from 'primeng/table';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    NgIf,
    DialogModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    AsyncPipe,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    NgrxFormsModule,
    TableModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit, OnDestroy {
  category: { name: string | undefined } | undefined;
  categorys?: string[] = [];
  formState$?: Observable<FormGroupState<Products>>;
  visable: boolean = false;
  specificCategory$?: Observable<Category[]>;

  private visable$?: Observable<boolean>;
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  private http$ = inject(ApiService);
  closeDialog() {
    this.store.dispatch(DialogActions.setVisable({ status: false }));
  }
  onSubmit() {
    this.formState$
      ?.pipe(
        takeUntil(this.destroy$),
        filter((formState) => formState.isValid),
        switchMap((formState) => {
          const { id, title, category, image, description, price } =
            formState.controls;
          return this.http$
            .put<string>(
              `products/${id.value}`,
              JSON.stringify({
                title: title.value,
                category: category.value,
                description: description.value,
                price: price.value,
                image: image.value,
              }),
            )
            .pipe(
              map((response) => response.body),
              catchError((err) =>
                throwError(() => new Error(err.error.message)),
              ),
            );
        }),
      )
      .subscribe({
        next: (val) => {
          console.log(val);
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    // .subscribe((formState) => {
    //   if (formState.isValid) {
    //     console.log(formState.value);
    //     const { id, title, category, image, description, price } =
    //       formState.controls;

    //     this.http$
    //       .put<string>(
    //         `products/${id.value}`,
    //         JSON.stringify({
    //           title: title.value,
    //           category: category.value,
    //           description: description.value,
    //           price: price.value,
    //           image: image.value,
    //         }),
    //       )
    //       .pipe(
    //         map((val) => val.body),
    //         catchError((err) => {
    //           return throwError(() => new Error(err.error.message));
    //         }),
    //       )
    //       .subscribe({
    //         next: (val) => {
    //           console.log(val);
    //         },
    //         error: (err) => {
    //           console.log(err.message);
    //         },
    //       });
    //   }
    // })
    // .unsubscribe(); // 執行後馬上取消訂閱防止每次更新資料都在觸發
  }
  changeCategory(event: DropdownChangeEvent) {
    this.store.dispatch(
      DialogActions.loadSpecificCategory({
        url: `products/category/${event.value}`,
        init: false,
      }),
    );
  }
  ngOnInit(): void {
    this.formState$ = this.store.select(selectForm);
    this.visable$ = this.store.select(selectDialogVistable);
    this.specificCategory$ = this.store.select(selectSpecificCategory);
    this.store
      .select(selectCategorys)
      .subscribe((item) => (this.categorys = [...item]));
    combineLatest([this.visable$])
      .pipe(
        takeUntil(this.destroy$),
        map(([vistable]) => {
          this.visable = vistable;
        }),
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next(); // 觸發 takeUntil 操作符，導致訂閱被取消
    this.destroy$.complete(); // 確保 Subject 被完全關閉，防止它被再次使用或發出值。
  }
}
