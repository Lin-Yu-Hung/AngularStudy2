import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCarts } from '../store/cart/cart';
import { selectCarts } from '../store/cart/cart.selector';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { Carts } from './cart.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { selectorSearchText } from '../store/search/search.selector';
import { updateSearchText } from '../store/search/search.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, NgIf, TableModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  carts$?: Observable<Carts[]>;
  ngOnInit(): void {
    this.store.dispatch(loadCarts({ url: 'carts' }));
    this.carts$ = combineLatest([
      this.store.select(selectCarts),
      this.store.select(selectorSearchText),
    ]).pipe(
      map(([carts, searchText]) => {
        if (carts.length > 0) {
          return carts.filter(
            (cart) =>
              // 搜尋id或是userId
              cart.id
                .toString()
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
              cart.userId
                .toString()
                .toLowerCase()
                .includes(searchText.toLowerCase()),
          );
        }
        return [];
      }),
    );
  }
  ngOnDestroy(): void {
    this.store.dispatch(updateSearchText({ value: '' }));
    this.destroy$.next();
    this.destroy$.complete();
  }
}
