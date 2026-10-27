const express = require('express');
const cors = require('cors');

// Для Node.js v18+ встроенный fetch, но для генерации данных установим @faker-js/faker
// npm install express cors @faker-js/faker
const { faker } = require('@faker-js/faker');

const app = express();
app.use(cors());

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});