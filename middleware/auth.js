require("dotenv").config().parsed
const jwt = require('jsonwebtoken')

authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace(/^Bearer\s+/, '');
        const isVerified = jwt.verify(token, process.env.JWT_SECRET);
        if (isVerified.email) {
            req.id = isVerified.id;
            req.email = isVerified.email
            next();

        }
        else {
            res.status(403).json({
                message: "Not authorized"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Unauthorize Access"
        })
    }

};
module.exports = authMiddleware;