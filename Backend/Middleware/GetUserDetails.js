const JWT_Secure = require('jsonwebtoken')
const JWT_Str = "SaadIsHere"

const Middleware = (req, res, next) => {

    // get the user details by JWT and add to user req
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });  
    }
    try {
        const data = JWT_Secure.verify(token, JWT_Str)
        req.user = data.user;
        next()
    } catch (error) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });  
    }
}

module.exports = Middleware