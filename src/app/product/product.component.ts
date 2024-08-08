import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  combineLatest,
  concat,
  map,
  merge,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectorSearchText } from '../store/search/search.selector';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  selectProductInfo,
  selectProducts,
  selectProductFailure,
} from '../store/products/product.selector';
import { updateSearchText } from '../store/search/search.action';
import { ButtonModule } from 'primeng/button';
import { DialogComponent } from '../dialog/dialog.component';
import { Product, Products } from './product.model';
import { DialogActions } from '../store/dialog/dialog.action';
import { selectDialogVistable } from '../store/dialog/dialog.selector';
import { productActions } from '../store/products/product.action';
import { SetUserDefinedPropertyAction, SetValueAction } from 'ngrx-forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TableModule, AsyncPipe, NgIf, ButtonModule, DialogComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit, OnDestroy {
  private http = inject(ApiService);
  private action = new SetUserDefinedPropertyAction(
    'ProductForm',
    'testData',
    true,
  );
  private setValueAction = new SetValueAction('ProductForm', 'testData');
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  visable$?: Observable<boolean>;

  filteredProducts$?: Observable<Products[] | undefined>;
  toggleDialog(status: boolean) {
    this.store.dispatch(DialogActions.setVisable({ status }));
  }
  setProductData(data: Products) {
    this.store.dispatch(
      DialogActions.loadSpecificCategory({
        url: `products/category/${data.category}`,
        init: true,
      }),
    );
    this.store.dispatch(DialogActions.setProductInfo({ data }));
    this.store.dispatch(
      DialogActions.setUserDefined({
        key: 'category',
        obj: { key: 'test', value: ['a', 'b'] },
      }),
    );
  }
  ngOnInit() {
    // merge(
    //   this.http.get('products'),
    //   this.http.get('products'),
    //   this.http.get('products'),
    // ).subscribe((data) => {
    //   console.log(data);
    // });
    this.store.dispatch(this.action);
    const { loadCategorys, loadProducts } = productActions;
    this.visable$ = this.store.select(selectDialogVistable);
    this.store.dispatch(loadProducts({ url: 'products' })); // 呼叫api
    this.store.dispatch(loadCategorys({ url: 'products/categories' }));

    this.filteredProducts$ = combineLatest([
      this.store.select(selectProducts),
      this.store.select(selectProductFailure),
      this.store.select(selectorSearchText),
    ]).pipe(
      takeUntil(this.destroy$),
      map(([products, error, searchText]) => {
        if (!error) {
          return products.filter((product: Product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase()),
          );
        } else {
          return products;
        }
      }),
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(updateSearchText({ value: '' }));
    this.destroy$.next();
    this.destroy$.complete();
  }
}
