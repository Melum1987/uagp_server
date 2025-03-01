const db = require('../config/db');

class Wishlist {
  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM wishlist WHERE user_id = ?', [userId]);
    return rows[0];
  }

  static async update(userId, products) {
    const [result] = await db.execute(
      'UPDATE wishlist SET products = ? WHERE user_id = ?',
      [JSON.stringify(products), userId]
    );
    return result;
  }
}

module.exports = Wishlist;