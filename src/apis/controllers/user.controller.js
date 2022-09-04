const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { userService, tokenService } = require('../services')

const CreateUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    const tokens = await tokenService.generateAuthTokens(user)
    res.status(httpStatus.CREATED).send({ user, tokens })
})

const DeleteUser = catchAsync(async (req, res) => {
    await userService.deleteUser(req.params.id)
    res.status(httpStatus.OK).send({
        success: true,
    })
})

const GetUsers = catchAsync(async (req, res) => {
    const data = await userService.getUsers()
    res.status(httpStatus.OK).send({ data })
})

const UpdateUser = catchAsync(async (req, res) => {
    const data = await userService.updateUser(req.params.id, req.body)
    res.status(httpStatus.OK).send({ data })
})

const GetUserById = catchAsync(async (req, res) => {
    const data = await userService.getUserById(req.params.id)
    res.status(httpStatus.OK).send({ data })
})

const GetFriendListOfUser = catchAsync(async (req, res) => {
    console.log(req)
    const user = await userService.getUserById(req.params.id)
    const data = user.friendList
    res.status(httpStatus.OK).send({ data })
})

const FollowUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.id)
    const targetUser = await userService.getUserById(req.body.targetID)
    if (!user.followingList.includes(targetUser._id)) {
        user.followingList.push(targetUser._id)
        targetUser.followerList.push(user._id)
        await user.save()
        await targetUser.save()
    } else {
        res.status(httpStatus.FORBIDDEN).json('You allready follow this user')
    }
    res.status(httpStatus.OK).send({ data })
})

const UnfollowUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.id)
    const targetUser = await userService.getUserById(req.body.targetID)
    if (!user.followingList.includes(targetUser._id)) {
        res.status(httpStatus.FORBIDDEN).json('You are not yet follow this user')
    } else {
        user.followingList.pull(targetUser._id)
        targetUser.followerList.pull(user._id)
        await user.save()
        await targetUser.save()
    }
    res.status(httpStatus.OK).send({ data })
})

module.exports = {
    CreateUser,
    DeleteUser,
    GetUsers,
    UpdateUser,
    GetUserById,
    GetFriendListOfUser,
    FollowUser,
    UnfollowUser,
}
