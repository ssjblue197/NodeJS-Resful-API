const moment = require('moment')
const httpStatus = require('http-status')
const env = require('../../configs/env')

const tokenService = require('./token.service')
const userService = require('./user.service')
const { tokenTypes } = require('../../configs/tokens')

const ApiError = require('../../utils/api-error')

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email)
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }
    return user
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<boolean>}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await tokenService.getTokenByRefresh(refreshToken, false)
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    await refreshTokenDoc.remove()
    return true
}

const refreshAuth = async (refreshToken) => {
    const refreshTokenDoc = await tokenService.getTokenByRefresh(refreshToken, false)
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
    }
    if (moment(refreshTokenDoc.expires).diff(moment(Date.now())) > 0) {
        const accessTokenExpires = moment().add(env.passport.jwtAccessExpired / 60, 'minutes')
        const accessToken = tokenService.generateToken(refreshTokenDoc.user, accessTokenExpires, tokenTypes.ACCESS)
        return {
            success: true,
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
        }
    } else {
        await refreshTokenDoc.remove()
        return {
            success: false,
        }
    }
}

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
}
