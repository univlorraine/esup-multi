const express = require('express');
const router = express.Router();
const { rssData, articleData } = require('./rss.mock.js');

router.get('/', (req, res) => {
    res.set('Content-Type', 'application/atom+xml');
    res.send(rssData);
});
router.get('/:guid', (req, res) => {
    const article = articleData
        .replaceAll('{guid}', req.params.guid)
        .replaceAll('{GUID}', req.params.guid.toUpperCase());
    res.set('Content-Type', 'text/html');
    res.send(article);
});

module.exports = router;
