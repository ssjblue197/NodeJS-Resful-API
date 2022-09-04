const express = require('express')

const authRoute = require('./auth.route')
const messageRoute = require('./message.route')
const userRoute = require('./user.route')
const conversationRoute = require('./conversation.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/messages',
        route: messageRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/conversations',
        route: conversationRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
