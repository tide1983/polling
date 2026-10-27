const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

const app = express();
app.use(cors());

// --- Эндпоинт для Задачи 1 (Polling) ---
app.get('/messages/unread', (req, res) => {
  // С вероятностью 50% генерируем от 1 до 3 новых сообщений, иначе пустой массив
  const count = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
  const messages = [];

  for (let i = 0; i < count; i++) {
    messages.push({
      id: faker.string.uuid(),
      from: faker.internet.email(),
      subject: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      received: Math.floor(Date.now() / 1000) - i * 60,
    });
  }

  res.json({
    status: 'ok',
    timestamp: Math.floor(Date.now() / 1000),
    messages: messages,
  });
});

// --- Экспорт для Vercel ---
module.exports = app;

// --- Локальный запуск ---
if (require.main === module) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Mock server running at http://localhost:${PORT}`);
  });
}
