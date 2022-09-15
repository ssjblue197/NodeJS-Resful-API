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
        phoneNumber: Joi.string()
            .required()
            .regex(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/),
        firstName: Joi.string().required().min(1).max(64),
        lastName: Joi.string().required().min(1).max(64),
        gender: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
    }),
}

module.exports = {
    loginSchema,
    logoutSchema,
    registerSchema,
    refreshTokenSchema,
}
