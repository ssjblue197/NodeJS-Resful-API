const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { conversationService } = require('../services')

const CreateConversation = catchAsync(async (req, res) => {
    const data = await conversationService.createConversation(req.body)
    res.status(httpStatus.CREATED).send({ data })
})

const GetConversationsOfUser = catchAsync(async (req, res) => {
    const data = await conversationService.getConversationsOfUser(req.params.userID)
    res.status(httpStatus.OK).send({ data })
})

const UpdateConversation = catchAsync(async (req, res) => {
    const data = await conversationService.updateConversation(req.params.conversationID, req.body)
    res.status(httpStatus.OK).send({ data })
})

const DeleteConversation = catchAsync(async (req, res) => {
    const conversation = await conversationService.deleteConversation(req.params.userID, req.params.conversationID)
    if (conversation) {
        if (conversation.memberList.length === conversation.deletedBy.length) {
            conversation.remove()
            res.status(httpStatus.OK).send({ success: true })
        } else {
            res.status(httpStatus.OK).send({ data: conversation })
        }
    } else {
        res.status(httpStatus.NOT_FOUND).send({
            message: 'Conversation is not exitst',
        })
    }
})

module.exports = {
    GetConversationsOfUser,
    CreateConversation,
    UpdateConversation,
    DeleteConversation,
}
