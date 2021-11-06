const jwt = require('jsonwebtoken')

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({error: "Wrong Token"});
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({error: "Do not have permision"});
    }
};

module.exports = authenticateJWT;