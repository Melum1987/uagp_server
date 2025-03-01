const Wishlist = require('../models/wishlistModel');

exports.getWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const wishlist = await Wishlist.findByUserId(userId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateWishlist = async (req, res) => {
  const { userId } = req.params;
  const { products } = req.body;
  try {
    await Wishlist.update(userId, products);
    res.status(200).json({ message: 'Wishlist updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};