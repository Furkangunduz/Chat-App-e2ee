const {
    saveUser,
    startChatRequest,
    chatRequestAccepted,
    chatRequestDeclined,
    userLeft,
    newMessage,
    disconnect
} = require("./controllers/socketControllers")

const socket = (server) => {
    //example user  [name,public_key,socketid]
    const activeUsers = []
    const rooms = []
    const responseWaiters = []

    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.on("save-user", (user) => {
            saveUser(socket, activeUsers, user)
        })
        socket.on("start-chat-request", (public_key) => {
            startChatRequest(io, socket, activeUsers, responseWaiters, rooms, public_key)
        })
        socket.on("chat-request-accepted", () => {
            chatRequestAccepted(io, socket, responseWaiters)
        })
        socket.on("chat-request-declined", () => {
            chatRequestDeclined(io, socket, rooms, responseWaiters)
        })
        socket.on("user-left", () => {
            userLeft(io, socket, rooms)
        })
        socket.on("newMessage", (message) => {
            newMessage(io, socket, rooms, message)
        })
        socket.on('disconnect', () => {
            disconnect(io, socket, activeUsers, rooms)
        });
    })
}

module.exports = socket