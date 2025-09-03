const express = require('express');
const router = express.Router();

// Importar el controlador de productos
const productController = require('../controllers/productController');

// Rutas CRUD para Productos
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);

// Rutas de la tarea
router.get('/products/count', productController.countProducts);
router.get('/products/total', productController.totalCost);

// Rutas de reviews (relación 1:N)
router.get('/products/:productId/reviews', productController.getReviews);
router.post('/products/:productId/reviews', productController.addReview);

module.exports = router;
