const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const { toJSON, paginate } = require('./plugins')

const userSchema = mongoose.Schema(
    {
        displayName: {
            type: String,
            maxLength: 64,
            // required: true,
            default: '',
        },
        firstName: {
            type: String,
            maxLength: 64,
            // required: true,
        },
        lastName: {
            type: String,
            maxLength: 64,
            // required: true,
        },
        dateOfBirth: {
            type: Date,
        },
        lastLogin: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
        },
        status: {
            type: String,
            enum: ['online', 'offline', 'busy'],
        },
        description: {
            type: String,
            default: '',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'mod'],
        },
        profileImageUrl: {
            type: String,
            default: '',
        },
        coverImageUrl: {
            type: String,
            default: '',
        },
        phoneNumber: {
            type: String,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!value.match(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/)) {
                    throw new Error('Phone number is not valid.')
                }
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email')
                }
            },
        },
        password: {
            type: String,
            // required: true,
            trim: true,
            minlength: 6,
            validate(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error('Password must contain at least one letter and one number')
                }
            },
            private: true,
        },
        authType: {
            type: String,
            enum: ['local', 'google', 'facebook', 'twitter'],
            default: 'local',
        },
        authGoogleID: {
            type: String,
            default: null,
        },
        authFacebookID: {
            type: String,
            default: null,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        followerList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        followingList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        friendList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        blackList: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
)

userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

userSchema.statics.isPhoneNumberTaken = async function (phoneNumber) {
    const user = await this.findOne({ phoneNumber: phoneNumber})
    return !!user
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

userSchema.pre('save', async function (next) {
    const user = this
    if (this.authType !== 'local') next()
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema)

module.exports = User
