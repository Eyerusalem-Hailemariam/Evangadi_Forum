const StatusCodes  = require('http-status-codes');
const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const autheader = req.headers.authorization;

    if (!autheader || !autheader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is missing' });
    }
    const token = autheader.split(' ')[1];
    console.log(autheader);
    console.log(token);

    try {

        const {username, userid} = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { username, userid}
        next();
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
}

module.exports = authMiddleware; 