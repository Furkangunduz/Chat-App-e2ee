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

        socket.on("save-user", ({ name, public_key }) => {
            let user = undefined

            activeUsers.forEach((e) => {
                if (e[1] == public_key) {
                    user = e
                }
            })
            if (user === undefined) {
                activeUsers.push([name, public_key, socket.id])
                return
            }
            user[0] = name
            user[1] = public_key
            user[2] = socket.id

            console.log("active-users", activeUsers)
        })

        socket.on("start-chat-request", (public_key) => {
            if (!public_key) return
            let user = undefined
            let friend = undefined
            activeUsers.forEach((e) => {
                if (e[1] == public_key) {
                    friend = e
                }
                if (e[2] == socket.id) {
                    user = e
                }
            })
            if (user == undefined) {
                console.log("Some error occured.")
                return
            }
            if (friend == undefined) {
                console.log("User is not online.")
                socket.emit("user-not-online")
                return
            }
            if (friend[2] == socket.id) {
                console.log("cant start chat with yourself.")
                return
            }
            console.log("sent request")
            responseWaiters.push({ waiter: user, from: friend })
            rooms.push([user, friend])
            console.log(responseWaiters)
            socket.emit("waiting-response")
            io.to(friend[2]).emit("start-chat-request", user)
        })

        socket.on("chat-request-accepted", () => {
            responseWaiters.forEach((e) => {
                if (e.from[2] == socket.id) {
                    io.to(e.waiter).emit("chat-request-accepted", e.from)
                }
            })
        })

        socket.on("chat-request-declined", () => {
            responseWaiters.forEach((e) => {
                if (e.from == socket.id) {
                    io.to(e.waiter).emit("chat-request-declined")

                    console.log("rooms length before delete: ", rooms.length)
                    rooms.forEach((room, index) => {
                        room.forEach((user) => {
                            if (user[2] == socket.id) {
                                rooms.splice(index, 1)
                            }
                        })
                    })
                    console.log("rooms length after delete : ", rooms.length)
                }

            })

        })
    })
}

module.exports = socket