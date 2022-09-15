const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const morgan = require('morgan')
const xss = require('xss-clean')
const path = require('path')
const rfs = require('rotating-file-stream')

const env = require('../configs/env')
const { errorConverter, errorHandler } = require('../middlewares/error')
const { customizeLimiter } = require('../middlewares/rate-limit')
const routeConfig = require('../apis/routes')

module.exports = () => {
    const app = express()
    //Save logs into files perday
    accessLogStream = rfs.createStream('zola-track-log.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '..', 'logs'),
    })

    // set log request
    // app.use(morgan('combined', { stream: accessLogStream }))
    app.use(morgan('dev'))

    // set security HTTP headers
    app.use(helmet())

    // parse json request body
    app.use(express.json())

    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }))

    // sanitize request data
    app.use(xss())
    app.use(mongoSanitize())

    // gzip compression
    app.use(compression())

    // set cors blocked resources
    app.use(cors())
    app.options('*', cors())

    // setup limits
    if (env.isProduction) {
        app.use('/auth', customizeLimiter)
    }

    // api routes
    app.use(env.app.routePrefix, routeConfig)

    // convert error to ApiError, if needed
    app.use(errorConverter)

    // handle error
    app.use(errorHandler)

    // app.listen(env.app.port)

    //Config SocketIO run same port with Express
    const server = require('http').createServer(app)
    const io = require('socket.io')(server, {
        cors: {
            origin: ['http://10.2.26.70:8080'],
        }
    })

    let userList = [];
    const addUser = (userID, socketID) => {
        !userList.some(user => user.userID === userID) && userList.push({userID, socketID});
        io.emit('getUser', userList);
    }

    const removeUser = (socketID) => {
        userList = userList.filter(user => user[1] === socketID)
    }
    // WHEN CLIENT CONNECT TO WS
    io.on('connection', (socket) => {
        console.log('Connected', socket.id)
        io.to(socket.id).emit('return ID', {
            id: socket.id
        })

        socket.on("joinRoom", (data) => {
            addUser(data.userID, socket.id)
            console.log('UserID', data.userID);
            if (data.roomList && data.roomList.length > 0) {
                for (const room of data.roomList) {
                    socket.join(room.id)
                }
            }
            console.log(socket.rooms);
        })
        socket.on("sendMessage", (data) => {
            socket.to(data.conversationID).emit("newMessage");
        })

        socket.on('disconnect', () => {
            removeUser(socket.id);
        })
    })

    io.engine.on("connection_error", (err) => {   // the error code, for example 1
        console.log(err.message);  // the error message, for example "Session ID unknown"
      });

    server.listen(env.app.port)
    return app
}
