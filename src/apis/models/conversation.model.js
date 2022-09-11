const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const conversationSchema = mongoose.Schema(
    {
        memberList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        type: {
            type: String,
            enum: ['private', 'group'],
            default: 'private',
        },
        backgroundImage: {
            type: String,
            default: '',
        },
        deletedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    {
        timestamps: true,
    }
)

conversationSchema.plugin(toJSON)

/**
 * @typedef Conversation
 */
const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation
