const httpStatus = require('http-status')

const ApiError = require('../../utils/api-error')
const { User } = require('../models')

/**
 * Get all users
 * @returns {Promise<Users>}
 */
const getUsers = async () => {
    return User.find({})
}

/**
 * Get user by ID
 * @param {string} userID
 * @returns {Promise<User>}
 */
const getUserById = async (userID) => {
    return User.findById(userID)
}

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
    }
    if (await User.isPhoneNumberTaken(userBody.phoneNumber)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Phone number is used')
    }
    return User.create(userBody)
}

const updateUser = async (id, userBody) => {
    const user = await User.findOne({ _id: id })

    Object.keys(userBody).forEach((key) => {
        user[key] = userBody[key]
    })
    await user.save()

    return user
}

const deleteUser = async (userID) => {
    return User.deleteOne({ _id: userID })
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
}
