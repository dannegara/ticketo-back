const express = require('express');
const { redirectWithoutToken } = require('../middleware/protectedRoute');

const Ticket = require('../controllers/ticket');

const router = express.Router();

router.post('/activate_ticket', redirectWithoutToken, Ticket.activateTicket);

router.post('/buy_ticket', redirectWithoutToken, Ticket.buyTicket);

module.exports = router;