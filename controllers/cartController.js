const Cart = require('../models/cartModel');

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const { userId } = req.params;
  const { products } = req.body;
  try {
    await Cart.update(userId, products);
    res.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};