const express = require('express');

const Countries = require('../controllers/countries');

const router = express.Router();

router.get('/get_countries', Countries.getCountries);

router.get('/get_countries/:countryId', Countries.getCountries);

module.exports = router;