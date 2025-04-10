const express = require('express');
const { handleMessage } = require('../controllers/chatController');

const router = express.Router();
router.post('/', handleMessage);

module.exports = router;