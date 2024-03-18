const express = require('express');
const router = express.Router();
const { chatbotData } = require('./chatbot.mock');

router.post('/', (req, res) => res.json(chatbotData));


module.exports = router;
