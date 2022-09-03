const express = require('express')

const authRoute = require('./auth.route')
const taskRoute = require('./task.route')
const userRoute = require('./user.route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/tasks',
        route: taskRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router
