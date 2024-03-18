const express = require('express');
const router = express.Router();
const { notificationsData } = require('./notifications.mock');

router.get('/multi-notification-manager/channels/*', (req, res) => res.send());
router.post('/multi-notification-manager/notifications/read', (req, res) => res.send());
router.get('/multi-notification-manager/notifications/*', (req, res) => res.json(notificationsData));

module.exports = router;
