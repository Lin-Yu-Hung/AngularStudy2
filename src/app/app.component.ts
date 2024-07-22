import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchFormComponent } from './search-form/search-form.component';
import { ProductComponent } from './product/product.component';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { updateSearchText } from './store/search/search.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchFormComponent,
    ProductComponent,
    CardModule,
    TabMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject(Store);
  private menuItem: string = '';
  items: MenuItem[] = [
    { label: 'Product', routerLink: '/product' },
    { label: 'Cart', routerLink: '/cart' },
  ];
  changeMenuItem(item: MenuItem) {
    if (item.label !== this.menuItem) {
      this.store.dispatch(updateSearchText({ value: '' }));
      this.menuItem = item.label as string;
    }
  }
}
