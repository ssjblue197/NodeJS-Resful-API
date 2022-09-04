const express = require('express')
const passport = require('passport')
const { authController } = require('../controllers')
const { authValidation } = require('../validations')

const validate = require('../../middlewares/validate')

const router = express.Router()

router.post('/login', validate(authValidation.loginSchema), authController.Login)
router.post(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    validate(authValidation.logoutSchema),
    authController.Logout
)
router.post('/register', validate(authValidation.registerSchema), authController.Register)
router.post('/google', passport.authenticate('google-plus-token', { session: false }), authController.AuthGoogle)
router.post('/facebook', passport.authenticate('facebook-token', { session: false }), authController.AuthFacebook)

router.post(
    '/refresh-token',
    // passport.authenticate('jwt', { session: false }),
    validate(authValidation.refreshTokenSchema),
    authController.RefreshTokens
)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
