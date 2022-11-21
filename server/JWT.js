const dotenv = require('dotenv')
const {sign, verify} = require('jsonwebtoken')


dotenv.config()

const createTokens = (user) => {
    const accessToken = sign(user, process.env.JWT_SECRET, { expiresIn: "15m"})
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    console.log(accessToken)

    if (!accessToken) return res.redirect('/login');

    verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
            req.user = user
            next()
        } else {
            res.redirect('/login');
        }
    })
}

module.exports = {createTokens, validateToken}