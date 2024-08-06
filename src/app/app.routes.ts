// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';

export const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: '', redirectTo: '/articles', pathMatch: 'full' }
];
