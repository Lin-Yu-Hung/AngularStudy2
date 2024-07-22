import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { selectDialogVistable } from '../store/dialog/dialog.selector';
import { selectFromState } from '../store/form/form.selector';
import { Store } from '@ngrx/store';
import { Products } from '../product/product.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { DialogActions } from '../store/dialog/dialog.action';
import { selectCategorys } from '../store/products/product.selector';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

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
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit, OnDestroy {
  category: { name: string | undefined } | undefined;
  categorys?: string[] = [];
  formState$?: Observable<FormGroupState<Products>>;
  visable: boolean = false;
  private visable$?: Observable<boolean>;
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  closeDialog() {
    this.store.dispatch(DialogActions.setVisable({ status: false }));
  }
  onSubmit() {
    this.formState$
      ?.subscribe((formState) => {
        if (formState.isValid) {
          console.log('Form submitted:', formState.value);
        } else {
          console.log(formState.errors);
        }
      })
      .unsubscribe(); // 執行後馬上取消訂閱防止每次更新資料都在觸發
  }
  ngOnInit(): void {
    this.formState$ = this.store.select(selectFromState);
    this.visable$ = this.store.select(selectDialogVistable);
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
