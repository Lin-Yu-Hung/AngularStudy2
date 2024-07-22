import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: string; count: number };
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSource = new BehaviorSubject<string>('');
  currentSearchTerm$ = this.searchTermSource.asObservable();

  private tempData: Products[] = [];

  setTempData<T>(data: T) {
    this.tempData = JSON.parse(JSON.stringify(data));
  }

  updateSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }

  getShowData(searchText: string) {
    return this.tempData.filter((product) => {
      return product.title.match(searchText);
    });
  }
}
