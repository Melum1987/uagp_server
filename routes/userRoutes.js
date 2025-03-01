// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Маршруты для пользователей
router.post('/register', userController.register); // Регистрация пользователя
router.post('/login', userController.login); // Вход пользователя
router.get('/', userController.getAllUsers); // Получение всех пользователей
router.get('/:id', userController.getUserById); // Получение пользователя по ID
router.put('/:id', userController.updateUser); // Обновление пользователя
router.delete('/:id', userController.deleteUser); // Удаление пользователя

module.exports = router;