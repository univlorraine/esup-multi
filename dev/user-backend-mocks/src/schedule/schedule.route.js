const express = require('express');
const router = express.Router();
const { scheduleData } = require('./schedule.mock');

router.get('/*', (req, res) => res.json(scheduleData));

module.exports = router;
