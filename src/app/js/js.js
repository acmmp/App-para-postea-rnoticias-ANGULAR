document.addEventListener("DOMContentLoaded", () => {
    const articlesList = document.getElementById('articles-list');
    const articleTemplate = document.getElementById('article-template').content;
    const articleFormTemplate = document.getElementById('article-form-template').content;
    const homeLink = document.getElementById('home-link');
    const createLink = document.getElementById('create-link');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    let articles = [];

    function renderArticles(filter = '') {
        articlesList.innerHTML = '';
        let filteredArticles = articles.filter(article => 
            article.title.includes(filter) || article.content.includes(filter));
        if (categoryFilter.value) {
            filteredArticles = filteredArticles.filter(article => 
                article.category === categoryFilter.value);
        }
        filteredArticles.forEach(article => {
            const articleClone = articleTemplate.cloneNode(true);
            articleClone.querySelector('.article-title').textContent = article.title;
            articleClone.querySelector('.article-content').textContent = article.content;
            articleClone.querySelector('.article-category').textContent = article.category;
            articleClone.querySelector('.edit-article').addEventListener('click', () => editArticle(article));
            articleClone.querySelector('.delete-article').addEventListener('click', () => deleteArticle(article.id));
            articlesList.appendChild(articleClone);
        });
    }

    function addArticle(article) {
        articles.push(article);
        renderArticles();
    }

    function editArticle(article) {
        const articleForm = articleFormTemplate.cloneNode(true);
        articleForm.querySelector('#title').value = article.title;
        articleForm.querySelector('#content').value = article.content;
        articleForm.querySelector('#category').value = article.category;
        articleForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            article.title = e.target.title.value;
            article.content = e.target.content.value;
            article.category = e.target.category.value;
            renderArticles();
        });
        articlesList.innerHTML = '';
        articlesList.appendChild(articleForm);
    }

    function deleteArticle(id) {
        articles = articles.filter(article => article.id !== id);
        renderArticles();
    }

    homeLink.addEventListener('click', () => renderArticles());

    createLink.addEventListener('click', () => {
        const articleForm = articleFormTemplate.cloneNode(true);
        articleForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newArticle = {
                id: Date.now(),
                title: e.target.title.value,
                content: e.target.content.value,
                category: e.target.category.value
            };
            addArticle(newArticle);
        });
        articlesList.innerHTML = '';
        articlesList.appendChild(articleForm);
    });

    searchInput.addEventListener('input', (e) => renderArticles(e.target.value));

    categoryFilter.addEventListener('change', () => renderArticles(searchInput.value));
});


document.addEventListener("DOMContentLoaded", () => {
    const articlesList = document.getElementById('articles-list');
    const articleTemplate = document.getElementById('article-template').content;
    const articleFormTemplate = document.getElementById('article-form-template').content;
    const homeLink = document.getElementById('home-link');
    const createLink = document.getElementById('create-link');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const successMessage = document.getElementById('success-message');
    let articles = [];

    function renderArticles(filter = '') {
        articlesList.innerHTML = '';
        let filteredArticles = articles.filter(article => 
            article.title.includes(filter) || article.content.includes(filter));
        if (categoryFilter.value) {
            filteredArticles = filteredArticles.filter(article => 
                article.category === categoryFilter.value);
        }
        filteredArticles.forEach(article => {
            const articleClone = articleTemplate.cloneNode(true);
            articleClone.querySelector('.article-title').textContent = article.title;
            articleClone.querySelector('.article-content').textContent = article.content;
            articleClone.querySelector('.article-category').textContent = article.category;
            articleClone.querySelector('.edit-article').addEventListener('click', () => editArticle(article));
            articleClone.querySelector('.delete-article').addEventListener('click', () => deleteArticle(article.id));
            articlesList.appendChild(articleClone);
        });
    }

    function addArticle(article) {
        articles.push(article);
        renderArticles();
        showSuccessMessage();
    }

    function editArticle(article) {
        const articleForm = articleFormTemplate.cloneNode(true);
        articleForm.querySelector('#title').value = article.title;
        articleForm.querySelector('#content').value = article.content;
        articleForm.querySelector('#category').value = article.category;
        articleForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedArticle = {
                title: e.target.title.value,
                content: e.target.content.value,
                category: e.target.category.value
            };
            fetch(`http://localhost:3000/articles/${article.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedArticle)
            })
            .then(response => response.json())
            .then(() => {
                Object.assign(article, updatedArticle);
                renderArticles();
                showSuccessMessage();
            });
        });
        articlesList.innerHTML = '';
        articlesList.appendChild(articleForm);
    }
    

    function deleteArticle(id) {
        fetch(`http://localhost:3000/articles/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            articles = articles.filter(article => article.id !== id);
            renderArticles();
        });
    }
    

    function showSuccessMessage() {
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 2000); // El mensaje desaparece después de 2 segundos
    }

    homeLink.addEventListener('click', () => renderArticles());

    createLink.addEventListener('click', () => {
        const articleForm = articleFormTemplate.cloneNode(true);
        articleForm.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const newArticle = {
                id: Date.now(),
                title: e.target.title.value,
                content: e.target.content.value,
                category: e.target.category.value
            };
            addArticle(newArticle);
        });
        articlesList.innerHTML = '';
        articlesList.appendChild(articleForm);
    });

    searchInput.addEventListener('input', (e) => renderArticles(e.target.value));

    categoryFilter.addEventListener('change', () => renderArticles(searchInput.value));
});


//MANDAR ARTICULO AL BAKKENNDNDDDD----------------------------------
function addArticle(article) {
    fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    })
    .then(response => response.json())
    .then(() => {
        articles.push(article);
        renderArticles();
        showSuccessMessage();
    });
}


//---------------------------------------------------------------------------------------------


function loadArticles() {
    fetch('http://localhost:3000/articles')
        .then(response => response.json())
        .then(data => {
            articles = data;
            renderArticles();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadArticles();
    // El resto de tu código...
});
