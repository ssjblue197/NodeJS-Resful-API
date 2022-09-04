const express = require('express')

const { conversationController } = require('../controllers')

const router = express.Router()

router.get('/:userID', conversationController.GetConversationsOfUser)
router.post('/new', conversationController.CreateConversation)
router.patch('/:conversationID', conversationController.UpdateConversation)
router.delete('/:userID/:conversationID', conversationController.DeleteConversation)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Message management and retrieval
 */
