const jwt = require('jsonwebtoken');
const SecretKey = process.env.SECRET_KEY;

let AuthorizeAdmin = (req, res, next) => {
    // console.log(req.headers.token);
    // const Token = req.headers.token.split('_');
    //     console.log('Hi I am '+ Token);
    try {
        const Token = req.headers.token;    // create token with Bearer ==>req.header.token (t) is small byDefault
        console.log(Token);
        const AdminToAuthenticate = jwt.verify(Token, SecretKey);  // gives two arguments Token (payload/body) create in (admin-controller)
        // jwt.sign() jwt.sign take three arguments first payload/body(Email and SaltString) second secreate-key third expire-time
        if (AdminToAuthenticate) {
            next();
        } else {
            return res.json({
                Message: 'Authentication Failed',
                Data: false,
                Result: null
            })
        }
    } catch (error) {
        res.json({
            Message: error,
            Data: false,
            Result: null
        })
    }
}

module.exports = { AuthorizeAdmin }