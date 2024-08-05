import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './app/store/products/product.effect';
import { CartEffects } from './app/store/cart/cart';
import { provideAnimations } from '@angular/platform-browser/animations'; // 添加这行
import { reducers } from './app/store/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { DialogEffect } from './app/store/dialog/dialog.effect';

export class AppModule {}
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(reducers),
    provideEffects(ProductEffects, CartEffects, DialogEffect),
    provideAnimations(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
}).catch((err) => console.error(err));
