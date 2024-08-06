const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia esto por tu contraseña de MySQL
    database: 'articles'
});

// Conecta a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para crear un artículo
app.post('/articles', (req, res) => {
    const { title, content, category } = req.body;

    connection.query(
        'INSERT INTO articles (title, content, category) VALUES (?, ?, ?)',
        [title, content, category],
        (err, results) => {
            if (err) {
                console.error('Error al insertar el artículo:', err);
                res.status(500).json({ error: 'Error al insertar el artículo' });
                return;
            }
            res.status(201).json({ id: results.insertId, title, content, category });
        }
    );
});

// Ruta para obtener todos los artículos
app.get('/articles', (req, res) => {
    connection.query('SELECT * FROM articles', (err, results) => {
        if (err) {
            console.error('Error al obtener los artículos:', err);
            res.status(500).json({ error: 'Error al obtener los artículos' });
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener un artículo por ID
app.get('/articles/:id', (req, res) => {
    const { id } = req.params;

    connection.query('SELECT * FROM articles WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al obtener el artículo:', err);
            res.status(500).json({ error: 'Error al obtener el artículo' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Artículo no encontrado' });
            return;
        }
        res.json(results[0]);
    });
});

// Ruta para actualizar un artículo
app.put('/articles/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;

    connection.query(
        'UPDATE articles SET title = ?, content = ?, category = ? WHERE id = ?',
        [title, content, category, id],
        (err, results) => {
            if (err) {
                console.error('Error al actualizar el artículo:', err);
                res.status(500).json({ error: 'Error al actualizar el artículo' });
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ error: 'Artículo no encontrado' });
                return;
            }
            res.json({ message: 'Artículo actualizado' });
        }
    );
});

// Ruta para eliminar un artículo
app.delete('/articles/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM articles WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el artículo:', err);
            res.status(500).json({ error: 'Error al eliminar el artículo' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Artículo no encontrado' });
            return;
        }
        res.json({ message: 'Artículo eliminado' });
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
