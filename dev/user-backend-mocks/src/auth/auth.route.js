const express = require('express');
const router = express.Router();
const { authTokenData, userProviderData } = require('./auth.mock');

router.post('/', (req, res) => res.send(authTokenData()));
router.delete('/', (req, res) => res.send(true));
router.get('/multi-user-provider', (req, res) => res.json(userProviderData));

module.exports = router;
