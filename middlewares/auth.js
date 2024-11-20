const { getUser } = require("../services/auth")

function checkForAuthentication(req, res, next) {
    // const authorizationHeaderValue = req.headers['authorization']
    const tokenCookie = req.cookies?.token
    req.user = null
    // if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) {
    //     return next()
    // }
    // const token = authorizationHeaderValue.split("Bearer ")[1]
    if (!tokenCookie) {
        return next()
    }
    const token = tokenCookie
    const user = getUser(token)
    req.user = user
    return next()
}

//give that many roles
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')

        if (!roles.includes(req.user.role)) return res.end('UnAuthorized')

        next()
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}