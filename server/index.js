const express = require('express');
const cors = require('cors');
const { getAIResponse } = require('./services/aiService');
const { getDb } = require('./config/sqlite');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message, history, username } = req.body;
  try {
    const response = await getAIResponse(message, history, null, username);
    res.json(response);
  } catch (error) {
    res.status(500).json({ reply: 'Error processing your request.' });
  }
});

app.post('/api/order', async (req, res) => {
  const { username, product } = req.body;
  const db = await getDb();
  const user = await db.get('SELECT id FROM users WHERE username = ?', username);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const orderId = `ORD${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  await db.run('INSERT INTO orders (order_id, user_id, product_name, price, status) VALUES (?, ?, ?, ?, ?)',
    orderId, user.id, product.name, product.price, 'Processing');
  res.json({ orderId, message: 'Order placed successfully!' });
});

app.listen(5000, () => console.log('Server running on port 5000'));