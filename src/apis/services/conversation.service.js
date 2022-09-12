const { Conversation } = require('../models')

/**
 * Create a message
 * @param {Object} messageBody
 * @returns {Promise<Message>}
 */

/**
 * Get a message
 * @param {Object} messageBody
 * @returns {Promise<Message>}
 */
const getMessages = async () => {
    return Message.find({}).sort({ dueDate: -1 }).lean()
}

const createConversation = async (conversationBody) => {
    return Conversation.create(conversationBody)
}

const getConversationsOfUser = async (userID) => {
    return Conversation.find({
        memberList: {
            $in: [userID],
        },
        deletedBy: {
            $nin: [userID],
        },
    })
        .populate('memberList')
        .populate('lastMessage')
        .populate('lastMessage')
}

const updateConversation = async (id, conversationBody) => {
    const conversation = await Conversation.findOne({ _id: id })

    Object.keys(conversationBody).forEach((key) => {
        conversation[key] = conversationBody[key]
    })

    // console.log('conversation: ', conversation)

    await conversation.save()

    return conversation
}

const deleteConversation = async (userID, conversationID) => {
    const conversation = await Conversation.findById(conversationID)
    if (conversation && !conversation.deletedBy.includes(userID)) {
        conversation.deletedBy.push(userID)
        await conversation.save()
    }
    return conversation
}

module.exports = {
    deleteConversation,
    getMessages,
    updateConversation,
    createConversation,
    getConversationsOfUser,
}
