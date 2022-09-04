const Joi = require('joi')

const { password } = require('./customize.validation')

const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

const logoutSchema = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
}

const refreshTokenSchema = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
}

const registerSchema = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
}

module.exports = {
    loginSchema,
    logoutSchema,
    registerSchema,
    refreshTokenSchema,
}
