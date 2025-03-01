// models/userModel.js
const db = require('../config/db');

class User {
  // Создание пользователя
  static async create({ name, email, password }) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result;
  }

  // Поиск пользователя по email
  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  // Получение всех пользователей
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  }

  // Получение пользователя по ID
  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  // Обновление пользователя
  static async update(id, { name, email, password }) {
    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
      [name, email, password, id]
    );
    return result;
  }

  // Удаление пользователя
  static async delete(id) {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return result;
  }
}

module.exports = User;