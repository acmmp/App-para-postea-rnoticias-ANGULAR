// src/app/articles/articles.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  newArticle = { title: '', content: '' };

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  addArticle(): void {
    this.articleService.addArticle(this.newArticle).subscribe(article => {
      this.articles.push(article);
      this.newArticle = { title: '', content: '' }; // Reset the form
    });
  }
}
