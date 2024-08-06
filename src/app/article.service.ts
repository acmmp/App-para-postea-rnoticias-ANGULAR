// src/app/article.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:5000/articles';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addArticle(article: { title: string; content: string }): Observable<any> {
    return this.http.post(this.apiUrl, article);
  }
}
