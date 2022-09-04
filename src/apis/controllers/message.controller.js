const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { messageService } = require('../services')

const GetMessageOfConversation = catchAsync(async (req, res) => {
    const { userID, conversationID } = req.params
    const data = await messageService.getMessagesOfConversation(userID, conversationID)
    res.status(httpStatus.OK).send({ data })
})

const SendMessage = catchAsync(async (req, res) => {
    console.log(req.body)
    const data = await messageService.sendMessage(req.body)
    res.status(httpStatus.CREATED).send({ data })
})

const UpdateMessage = catchAsync(async (req, res) => {
    const data = await messageService.updateMessage(req.params.messageID, req.body)
    res.status(httpStatus.OK).send({ data })
})

const DeleteMessage = catchAsync(async (req, res) => {
    const { userID, messageID, conversationID } = req.params
    await messageService.deleteMessage(userID, messageID, conversationID)
    res.status(httpStatus.OK).send({ success: true })
})

const ForceDeleteMessage = catchAsync(async (req, res) => {
    const { userID, messageID } = req.params
    await messageService.forceDeleteMessage(userID, messageID)
    res.status(httpStatus.OK).send({ success: true })
})

module.exports = {
    GetMessageOfConversation,
    SendMessage,
    UpdateMessage,
    DeleteMessage,
    ForceDeleteMessage,
}
