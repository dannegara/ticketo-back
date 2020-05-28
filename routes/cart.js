const express = require('express');
const Cart = require('../controllers/cart');
const { redirectWithoutToken } = require('../middleware/protectedRoute');

const router = express.Router();

router.post('/add/:id', redirectWithoutToken, Cart.add);
router.get('/get', redirectWithoutToken, Cart.get);

module.exports = router;