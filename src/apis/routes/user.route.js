const express = require('express')

const { userController } = require('../controllers')
const { authValidation } = require('../validations')

const passport = require('passport')

const validate = require('../../middlewares/validate')

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), userController.GetUsers)
router.post('/add', userController.CreateUser)
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.GetUserById)
router.patch('/:id', passport.authenticate('jwt', { session: false }), userController.UpdateUser)
router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.DeleteUser)
router.get('/:id/friends', passport.authenticate('jwt', { session: false }), userController.GetFriendListOfUser)
router.put('/:id/follow', passport.authenticate('jwt', { session: false }), userController.FollowUser)
router.put('/:id/unfollow', passport.authenticate('jwt', { session: false }), userController.UnfollowUser)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */
