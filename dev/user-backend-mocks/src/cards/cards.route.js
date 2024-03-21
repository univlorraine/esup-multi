const express = require('express');
const router = express.Router();
const { cardsData } = require('./cards.mock.js');

router.get('/:username', (req, res) => res.json(cardsData));

module.exports = router;
