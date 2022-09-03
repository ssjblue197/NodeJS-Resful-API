const rateLimit = require('express-rate-limit')

const customizeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    skipSuccessfulRequests: true,
    handler: function (req, res) {
        res.status(429).send({
            status: 500,
            message: 'Too many requests!',
        })
    },
    skip: (req, res) => {
        if (req.ip === '::ffff:127.0.0.1') return true
        return false
    },
})

module.exports = {
    customizeLimiter,
}
