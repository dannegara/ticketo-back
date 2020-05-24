const express = require('express');
const multer = require('multer');
const Events = require('../controllers/events');
const { redirectWithoutToken } = require('../middleware/protectedRoute');

const router = express.Router();
const upload = multer({ dest: 'assets/posters/' });

router.get('/getEvents', Events.getEvents);
router.get('/getEvent/:eventId', Events.getEvents);
router.post('/addEvent', redirectWithoutToken, upload.single('poster'), Events.createEvent);

module.exports = router;