const express = require('express')

const { messageController } = require('../controllers')

const router = express.Router()

router.get('/:conversationID/:userID', messageController.GetMessageOfConversation)
router.patch('/:messageID/update', messageController.UpdateMessage)
router.post('/send', messageController.SendMessage)
router.delete('/:userID/:messageID/:conversationID', messageController.DeleteMessage)
router.delete('/:userID/:messageID/force', messageController.ForceDeleteMessage)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Message
 *   description: Message management and retrieval
 */
