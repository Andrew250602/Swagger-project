const jwt = require('jsonwebtoken');
const errorConstants = require("../constants/errorConstants")
const protocolConstants = require("../constants/protocalConstant")
require('dotenv').config()
const secretKey = process.env.JWT_SECRET_KEY

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (req.path.startsWith('/api/auth/') || req.path.startsWith('/api-docs')) {
        return next();
    }
    if (token == null) {
        return res.status(protocolConstants.UNAUTHORIZED).json({ error: errorConstants.UNAUTHORIZED_TOKEN_MISSING });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(protocolConstants.FORBIDDEN).json({ error: errorConstants.FORBIDDEN_INVALID_TOKEN });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;