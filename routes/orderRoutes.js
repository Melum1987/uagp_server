const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/user/:userId', orderController.getOrdersByUserId);
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;