const db = require('../config/db');

class Order {
  static async create({ user_id, products, total_price, status }) {
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, products, total_price, status) VALUES (?, ?, ?, ?)',
      [user_id, JSON.stringify(products), total_price, status]
    );
    return result;
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute('SELECT * FROM orders WHERE user_id = ?', [userId]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateStatus(id, status) {
    const [result] = await db.execute(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    );
    return result;
  }
}

module.exports = Order;