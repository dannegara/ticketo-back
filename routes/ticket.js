const express = require('express');

const Ticket = require('../controllers/ticket');

const router = express.Router();

router.post('/activate_ticket', Ticket.activateTicket);

router.post('/buy_ticket', Ticket.buyTicket);

module.exports = router;