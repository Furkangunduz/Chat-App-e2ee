const socket = (server) => {
    const activeUsers = {}
    const rooms = {}

    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on("save-user", ({ username, public_key }) => {
            activeUsers[username] = { "socket": socket.id, "public_key": public_key }
            console.log("active-users", activeUsers)
        })
        socket.on("start-chat", (public_key) => {
            for (let i = 0; i < activeUsers.length; i++) {
                if (activeUsers[i].public_key == public_key) {
                    socket.emit("waiting-response")
                    io.to(activeUsers[i].socket).emit("start-chat-request")
                }
            }
            socket.emit("user-not-active")
        })
    });
}

module.exports = socket