const express = require('express');
const router = express.Router();
const { menusData, restaurantsData } = require('./restaurants.mock');

router.get('/', (req, res) => res.json(restaurantsData));
router.get('/:id', (req, res) => res.json(menusData));

module.exports = router;
