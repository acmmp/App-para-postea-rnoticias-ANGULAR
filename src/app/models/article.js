const mongoose = require('mongoose');
const express = require('express');


// Definir el esquema del artículo
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['tecnologia', 'salud', 'educacion'] // Opcional: Enum para limitar las categorías
    }
}, { timestamps: true }); // Agrega campos de fecha de creación y actualización

// Crear el modelo basado en el esquema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;


// Controlador para manejar la creación de artículos
const articleController = require('../controllers/articleController');

// Definir la ruta para POST
router.post('/', articleController.createArticle);

module.exports = router;