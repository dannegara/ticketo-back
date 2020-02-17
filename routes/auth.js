const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '12345678';

const router = express.Router();

router.get('/login', (req, res) => {
    res.json({msg: 'Logged'});
});

router.post('/register', (req, res) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
    });
});

router.post('/login', (req, res) => {
    bcrypt.compare(myPlaintextPassword, '$2b$10$AzdezRGv8h.n6/NdfLWIOOteMV6GuPTq6voNiCrlS1o380JuHD4im', function(err, result) {
        // result == true
        console.log(result);
    });
});

module.exports = router;