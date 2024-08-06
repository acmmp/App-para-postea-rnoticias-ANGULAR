const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/articlesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
});

const Article = mongoose.model('Article', ArticleSchema);

app.use(bodyParser.json());
app.use(cors());

// Rutas CRUD
app.get('/articles', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.post('/articles', async (req, res) => {
  const newArticle = new Article(req.body);
  await newArticle.save();
  res.status(201).json(newArticle);
});

app.put('/articles/:id', async (req, res) => {
  const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedArticle);
});

app.delete('/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
