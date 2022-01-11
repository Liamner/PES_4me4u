const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const isCustomAuth = authHeader.startsWith('Bearer');
        const token = authHeader.split(' ')[1];
        if (token && isCustomAuth) {
            jwt.verify(token, process.env.SECRET, (err, user) => {
                if (err) {
                    next( res.status(403).json({error: "Wrong Token"}));
                }
                // return the user
                req.user = user;
            });
        }
        else {
            // google login
            const decodedData = jwt.decode(token);
            console.log(decodedData)
            req.user = decodedData?.sub;
        }
        next();
        
    } else {
        res.status(401).json({error: "Do not have permision"});
    }
};

module.exports = authenticateJWT;