import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { updateSearchText } from '../store/search/search.action';
import { Observable } from 'rxjs';
import { selectorSearchText } from '../store/search/search.selector';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    BreadcrumbModule,
    ButtonModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent implements OnInit {
  items: MenuItem[] = [{ label: 'page1' }, { label: 'page2' }];
  home: MenuItem = { label: 'home', routerLink: '/' };
  msg = '';
  msg$?: Observable<string>;
  private store = inject(Store);
  ngOnInit(): void {
    this.msg$ = this.store.select(selectorSearchText);
    this.msg$.subscribe((val) => {
      console.log(val);
      this.msg = val;
    });
  }
  onSubmit() {
    // this.searchService.updateSearchTerm(this.msg);
    this.store.dispatch(updateSearchText({ value: this.msg }));
  }
}
