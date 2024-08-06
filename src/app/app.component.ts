import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Asegúrate de importar Validators aquí
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from './article.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { ArticlesComponent } from './articles/articles.component';

import { RouterModule } from '@angular/router';  // Importa RouterModule






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,ReactiveFormsModule, HttpClientModule, CommonModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  articleForm: FormGroup;
  isFormVisible: boolean = false;
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  selectedArticleId?: number;

  constructor(private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Aquí puedes cargar los artículos si es necesario
  }

  showArticleForm(articleId?: number): void {
    this.selectedArticleId = articleId;
    if (articleId) {
      // Editar artículo
      const article = this.articles.find(a => a.id === articleId);
      if (article) {
        this.articleForm.patchValue(article);
      }
    } else {
      // Crear nuevo artículo
      this.articleForm.reset();
    }
    this.isFormVisible = true;
  }

  closeArticleForm(): void {
    this.isFormVisible = false;
  }

  submitArticleForm(): void {
    if (this.articleForm.valid) {
      const article = this.articleForm.value;
      if (this.selectedArticleId) {
        // Actualizar artículo existente
        const index = this.articles.findIndex(a => a.id === this.selectedArticleId);
        if (index !== -1) {
          this.articles[index] = { id: this.selectedArticleId, ...article };
        }
      } else {
        // Crear nuevo artículo
        this.articles.push({ id: Date.now(), ...article });
      }
      this.filteredArticles = [...this.articles];
      this.closeArticleForm();
    }
  }

  deleteArticle(articleId: number): void {
    this.articles = this.articles.filter(a => a.id !== articleId);
    this.filteredArticles = [...this.articles];
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const selectedCategory = target.value;
    this.filteredArticles = selectedCategory
      ? this.articles.filter(article => article.category === selectedCategory)
      : this.articles;
  }
}

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
}

