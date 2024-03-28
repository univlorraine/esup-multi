const express = require('express');
const router = express.Router();
const { clockingData } = require('./clocking.mock');

router.post('/', (req, res) => res.send(clockingData));

module.exports = router;
