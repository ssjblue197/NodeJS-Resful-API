const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { userService } = require('../services')

const CreateUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    res.status(httpStatus.CREATED).send({ user })
})

const DeleteUser = catchAsync(async (req, res) => {
    await userService.deleteUser(req.params.id)
    res.status(httpStatus.NO_CONTENT).send()
})

const GetUsers = catchAsync(async (req, res) => {
    const users = await userService.getUsers()
    res.status(httpStatus.OK).send({ users })
})

const UpdateUser = catchAsync(async (req, res) => {
    const task = await userService.updateUser(req.params.id, req.body)
    res.status(httpStatus.OK).send({ task })
})

module.exports = {
    CreateUser,
    DeleteUser,
    GetUsers,
    UpdateUser,
}
