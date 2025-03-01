const db = require('../config/db');

class Product {
  // Создание товара
  static async create({ img, name, category, audio, price, bpm, music_key, type }) {
    const [result] = await db.execute(
      'INSERT INTO products (img, name, category, audio, price, bpm, music_key, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [img, name, category, audio, price, bpm, music_key, type]
    );
    return result;
  }

  // Получение всех товаров
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM products');
    return rows;
  }

  // Получение товара по ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  // Получение товаров по music_key
  static async findByMusicKey(music_key) {
    const [rows] = await db.execute('SELECT * FROM products WHERE music_key = ?', [music_key]);
    return rows;
  }

  // Обновление товара
  static async update(id, { img, name, category, audio, price, bpm, music_key, type }) {
    const [result] = await db.execute(
      'UPDATE products SET img = ?, name = ?, category = ?, audio = ?, price = ?, bpm = ?, music_key = ?, type = ? WHERE id = ?',
      [img, name, category, audio, price, bpm, music_key, type, id]
    );
    return result;
  }

  // Удаление товара
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
    return result;
  }
}

module.exports = Product;