const express = require('express');
const router = express.Router();
const { authTokenData, userProviderData, errorsData } = require('./auth.mock');

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username !== password || !userProviderData[username]) {
        return res.status(401).send(errorsData.unauthorized(username));
    }

    res.send(authTokenData());
});
router.delete('/', (req, res) => res.send(true));
router.get('/multi-user-provider/:username', (req, res) => {
    const { username } = req.params;
    const userData = userProviderData[username];
    if (!userData) {
        return res.status(400).send(errorsData.unknownUser);
    }

    res.json(userData);
});

module.exports = router;
