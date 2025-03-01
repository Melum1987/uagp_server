// config/db.js
const mysql = require('mysql2');

// Создаем пул подключений к базе данных
const pool = mysql.createPool({
  host: 'localhost',      // Хост базы данных
  user: 'user_root',           // Имя пользователя
  password: 'Melum26032019', // Пароль пользователя
  database: 'user_uagp',       // Название базы данных
  waitForConnections: true,
  connectionLimit: 10,    // Максимальное количество подключений
  queueLimit: 0           // Без ограничений на очередь запросов
});

// Экспортируем пул подключений
module.exports = pool.promise();