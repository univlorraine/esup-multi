const express = require('express');
const router = express.Router();
const { cardsData } = require('./cards.mock.js');

router.get('/:username', (req, res) => {
    const { username } = req.params;
    let cards = cardsData[username];
    if (!cards) {
        cards = cardsData.noActiveCard;
    }
    return res.json(cards);
});

module.exports = router;
