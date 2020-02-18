const express = require('express');

//const Countries = require('../controllers/countries');

const Ticket = require('../controllers/ticket');

const router = express.Router();

// router.get('/get_countries', Countries.getCountries);

// router.get('/get_countries/:countryId', Countries.getCountries);

router.post('/activate_ticket', Ticket.activateTicket);

router.post('/buy_ticket', Ticket.buyTicket);

module.exports = router;