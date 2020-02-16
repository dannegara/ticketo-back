const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.json({msg: 'Logged'});
});

module.exports = router;