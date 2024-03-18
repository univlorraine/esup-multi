const express = require('express');
const router = express.Router();
const { mailCalendarData } = require('./mail-calendar.mock');
router.get('/*', (req, res) => res.json(mailCalendarData));

module.exports = router;
