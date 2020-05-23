const jwt = require('jsonwebtoken');

const decodeToken = (req, res, next) => {
    const token = req.headers['api-token'];
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.userId = decoded;
        next();
    }catch {
        req.userId = null;
        next();
    }
}

module.exports = {
    decodeToken
}