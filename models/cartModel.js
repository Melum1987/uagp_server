const db = require('../config/db');

class Cart {
  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM cart WHERE user_id = ?', [userId]);
    return rows[0];
  }

  static async update(userId, products) {
    const [result] = await db.execute(
      'UPDATE cart SET products = ? WHERE user_id = ?',
      [JSON.stringify(products), userId]
    );
    return result;
  }
}

module.exports = Cart;