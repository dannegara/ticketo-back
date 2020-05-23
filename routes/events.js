const express = require('express');
const Events = require('../controllers/events');

const router = express.Router();

router.get('/getEvents', Events.getEvents);
router.get('/getEvent/:eventId', Events.getEvents);
router.post('/addEvent', Events.createEvent);

module.exports = router;