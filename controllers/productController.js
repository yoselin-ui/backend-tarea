const db = require('../db');

// --- CREATE ---
// Crear un nuevo producto (POST /api/products)
exports.createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
}

// --- READ ---
// Obtener todos los productos (GET /api/products)
exports.getProducts = async (req, res) => { 
    try {
        const result = await db.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
}

// --- NUEVOS ENDPOINTS ---
// Conteo de productos (GET /api/products/count)
exports.countProducts = async (req, res) => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM products');
        res.status(200).json({ total: parseInt(result.rows[0].count) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al contar los productos' });
    }
}

// Sumatoria de precios (GET /api/products/total)
exports.totalCost = async (req, res) => {
    try {
        const result = await db.query('SELECT SUM(price) FROM products');
        res.status(200).json({ totalCost: parseFloat(result.rows[0].sum) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al calcular la suma de precios' });
    }
}

// --- RELACIÓN 1:N (Reviews) ---
// Obtener todas las reviews de un producto (GET /api/products/:productId/reviews)
exports.getReviews = async (req, res) => {
    const { productId } = req.params;
    try {
        const result = await db.query('SELECT * FROM reviews WHERE product_id = $1', [productId]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener las reviews' });
    }
}

// Crear una review para un producto (POST /api/products/:productId/reviews)
exports.addReview = async (req, res) => {
    const { productId } = req.params;
    const { comment, rating } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO reviews (product_id, comment, rating) VALUES ($1, $2, $3) RETURNING *',
            [productId, comment, rating]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar la review' });
    }
}

