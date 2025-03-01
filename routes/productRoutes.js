const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../config/multer'); // Импортируем multer

const router = express.Router();

// Создание товара с загрузкой файлов
router.post(
  '/',
  upload.fields([
    { name: 'img', maxCount: 1 }, // Поле для изображения
    { name: 'audio', maxCount: 1 }, // Поле для аудио
  ]),
  productController.createProduct
);

// Остальные маршруты
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;