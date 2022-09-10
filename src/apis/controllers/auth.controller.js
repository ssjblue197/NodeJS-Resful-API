const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { authService, tokenService, userService } = require('../services')

const Register = catchAsync(async (req, res) => {
    console.log(req.body);
    const user = await userService.createUser(req.body)
    const tokens = await tokenService.generateAuthTokens(user)
    res.status(httpStatus.CREATED).send({ user, tokens })
})

const AuthGoogle = catchAsync(async (req, res) => {
    console.log(req.user)
    const user = req.user
    const tokens = await tokenService.generateAuthTokens(user)
    res.send({ user, tokens })
})

const AuthFacebook = catchAsync(async (req, res) => {
    console.log(req.user)
    const user = req.user
    const tokens = await tokenService.generateAuthTokens(user)
    res.send({ user, tokens })
})

const Login = catchAsync(async (req, res) => {
    const { email, password } = req.body
    const user = await authService.loginUserWithEmailAndPassword(email, password)
    const tokens = await tokenService.generateAuthTokens(user)
    res.send({ user, tokens })
})

const Logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken)
    res.status(httpStatus.NO_CONTENT).send()
})

const RefreshTokens = catchAsync(async (req, res) => {
    const result = await authService.refreshAuth(req.body.refreshToken)
    if (result.success) {
        res.send({ ...result })
    } else {
        res.status(httpStatus.UNAUTHORIZED).send({
            message: 'Refresh token is expired. Please re-login!',
        })
    }
})

const ForgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email)
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
    res.status(httpStatus.NO_CONTENT).send()
})

const ResetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.query.token, req.body.password)
    res.status(httpStatus.NO_CONTENT).send()
})

const SendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user)
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken)
    res.status(httpStatus.NO_CONTENT).send()
})

const VerifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token)
    res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
    Register,
    Login,
    Logout,
    RefreshTokens,
    ForgotPassword,
    ResetPassword,
    SendVerificationEmail,
    VerifyEmail,
    AuthGoogle,
    AuthFacebook,
}
