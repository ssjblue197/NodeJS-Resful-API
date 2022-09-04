const mongoose = require('mongoose')

const { toJSON } = require('./plugins')

const friendRquest = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
        },
        status: {
            type: String,
            default: 'waiting',
        },
    },
    {
        timestamps: true,
    }
)

friendRquest.plugin(toJSON)

/**
 * @typedef FriendRquest
 */
const FriendRquest = mongoose.model('Message', friendRquest)

module.exports = FriendRquest
