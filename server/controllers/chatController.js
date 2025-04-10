const { getAIResponse } = require('../services/aiService');
const { addUser, saveChat } = require('../config/sqlite');

const handleMessage = async (req, res) => {
  const { message, history, username } = req.body;
  console.log('Received request:', req.body);

  if (!message || !username) {
    console.error('Missing message or username:', req.body);
    return res.status(400).json({ error: 'Message and username required' });
  }

  try {
    const userId = await addUser(username);
    const reply = await getAIResponse(message, history, req.session, username);
    await saveChat(userId, message, reply, 'neutral');
    console.log('Sending reply:', reply);
    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error.stack);
    res.status(500).json({ error: 'Server error. Try again.' });
  }
};

module.exports = { handleMessage };