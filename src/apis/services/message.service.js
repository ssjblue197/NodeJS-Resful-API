const { Message, Conversation } = require('../models')

/**
 * Create a message
 * @param {Object} messageBody
 * @returns {Promise<Message>}
 */
const sendMessage = async (messageBody) => {
    const conversationID = messageBody.conversationID
    const conversation = await Conversation.findById(conversationID)
    let newMessage = await Message.create(messageBody);
    newMessage = await newMessage.populate('sender');
    conversation.lastMessage = newMessage._id
    await conversation.save()
    return newMessage
}

const getMessagesOfConversation = async (userID, conversationID) => {
    return await Message.find({
        conversationID: conversationID,
        deletedBy: {
            $nin: [userID],
        },
    })
        .populate('seenBy')
        .populate('sender')
}

const updateMessage = async (id, messageBody) => {
    const message = await Message.findOne({ _id: id })
    Object.keys(messageBody).forEach((key) => {
        message[key] = messageBody[key]
        check = true
    })
    message.isModified = true
    await message.save()

    return message
}

const deleteMessage = async (userID, messageID, conversationID) => {
    const message = await Message.findById(messageID)
    const conversation = await Conversation.findById(conversationID)
    if (message && conversation && !message.deletedBy.includes(userID)) {
        message.deletedBy.push(userID)
        if (message.deletedBy.length === conversation.memberList.length) {
            message.remove()
        } else {
            message.save()
            return message
        }
    }
}

const forceDeleteMessage = async (userID, messageID) => {
    const message = await Message.findById(messageID)
    if (message && message.sender === userID) {
        message.remove()
    }
}

module.exports = {
    sendMessage,
    getMessagesOfConversation,
    updateMessage,
    deleteMessage,
    forceDeleteMessage,
}
