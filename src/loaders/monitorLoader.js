const basicAuth = require('express-basic-auth')
const monitor = require('express-status-monitor')

const env = require('../configs/env')

module.exports = (app) => {
    if (env.monitor.enabled) {
        app.use(monitor())
        app.get(
            env.monitor.route,
            env.monitor.username
                ? basicAuth({
                      users: {
                          [`${env.monitor.username}`]: env.monitor.password,
                      },
                      challenge: true,
                  })
                : (req, res, next) => next(),
            monitor().pageRoute
        )
    }
}
