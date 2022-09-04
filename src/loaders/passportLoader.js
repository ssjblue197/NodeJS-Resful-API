const passport = require('passport')

const { jwtStrategy, googlePassportStrategy, facebookPassportStrategy } = require('../apis/plugins/passport')

module.exports = (app) => {
    // jwt authentication
    // app.use(passport.initialize())
    passport.use(jwtStrategy)
    passport.use(googlePassportStrategy)
    passport.use(facebookPassportStrategy)
}
