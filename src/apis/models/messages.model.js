const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const messageSchema = mongoose.Schema(
    {
        conversationID: {
            type: String,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        messageType: {
            type: String,
            enum: ['text', 'image', 'video', 'shortcut'],
        },
        message: {
            type: String,
            default: '',
        },
        isModified: {
            type: Boolean,
            default: false,
        },
        deletedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        seenBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
        supressReservedKeysWarning: true,
    }
)

messageSchema.plugin(toJSON)

/**
 * @typedef Message
 */
const Message = mongoose.model('Message', messageSchema)

module.exports = Message
