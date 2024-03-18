const express = require('express');
const router = express.Router();
const { userDirectoryData } = require('./contacts.mock');

router.post('/multi-user-directory', (req, res) => res.json(userDirectoryData));

module.exports = router;
