const { call } = require('../config/database');

class Cart {
    static add = async (req, res) => {
        const { userId, params: { id }} = req;
        const [[{ msg }]] = await call('AddToCart', [id, userId]);
        res.json({ msg });
    }
    static get = async (req, res) => {
        const { userId } = req;
        const [ msg ] = await call('GetCart', [userId]);
        res.json(msg);
    }
}

module.exports = Cart;