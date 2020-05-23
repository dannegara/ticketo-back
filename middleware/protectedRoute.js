const redirectWithoutToken = (req, res, next) => {
    if(!req.userId) res.status(403).json({ err: 'not enough rights' });
    next();
}

module.exports = {
    redirectWithoutToken
}