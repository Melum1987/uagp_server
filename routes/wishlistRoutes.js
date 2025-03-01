const express = require('express');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.get('/:userId', wishlistController.getWishlist);
router.put('/:userId', wishlistController.updateWishlist);

module.exports = router;