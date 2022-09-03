const express = require('express')

const { userController } = require('../controllers')
const { authValidation } = require('../validations')

const validate = require('../../middlewares/validate')

const router = express.Router()

router.get('/', userController.GetUsers)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
