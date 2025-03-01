// server.js
const app = require('./app');
const db = require('./config/db'); // Импортируем подключение к базе данных
const PORT = process.env.PORT || 5000;

// Проверка подключения к базе данных
async function testDatabaseConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result'); // Простой тестовый запрос
    console.log('Database connection successful. Test query result:', rows[0].result);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Завершаем процесс, если подключение не удалось
  }
}

// Запуск сервера
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await testDatabaseConnection(); // Проверяем подключение к базе данных
});