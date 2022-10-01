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
                console.log("user saved")
                return
            }
            user[0] = name
            user[1] = public_key
            user[2] = socket.id

            console.log("active-users length", activeUsers.length)
        })
        socket.on("start-chat-request", (public_key) => {
            if (!public_key) socket.emit("wrong-public-key.")
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
                console.log("user undefined.")
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
            console.log("responseWaiters length ", responseWaiters.length)
            socket.emit("waiting-response")
            io.to(friend[2]).emit("start-chat-request", user)
        })
        socket.on("chat-request-accepted", () => {
            console.log("chat request accepted")
            responseWaiters.forEach((e, indx) => {
                if (e.from[2] == socket.id) {
                    io.to(e.waiter).emit("chat-request-accepted", e.from)
                    console.log("responseWaiters length :", responseWaiters.length)
                    responseWaiters.splice(indx, 1)
                    console.log("responseWaiters length after:", responseWaiters.length)
                }
            })
        })
        socket.on("chat-request-declined", () => {
            console.log("chat request declined")
            responseWaiters.forEach((e, indx) => {
                if (e.from[2] == socket.id) {
                    io.to(e.waiter[2]).emit("chat-request-declined")
                    socket.emit("chat-request-declined")

                    console.log("responseWaiters length :", responseWaiters.length)
                    responseWaiters.splice(indx, 1)
                    console.log("responseWaiters length after:", responseWaiters.length)

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
        socket.on("newMessage", (message) => {
            console.log("new message received")
            console.log("message is : ", message)
            rooms.forEach((room) => {
                room.forEach((user) => {
                    if (user[2] != socket.id) {
                        io.to(user[2]).emit("newMessage", message)
                        return
                    }
                })
            })
        })
        socket.on('disconnect', () => {
            console.log("rooms.length :", rooms.length)
            console.log("activeUsers :", rooms.length)
            activeUsers.forEach((user, index) => {
                if (user[2] == socket.id) {
                    activeUsers.splice(index, 1)
                }
            })
            console.log("activeUsers :", rooms.length)
            rooms.forEach((room, indx) => {
                room.forEach((user, index) => {
                    if (user[2] == socket.id) {
                        room.splice(index, 1)
                        io.to(room[0][2]).emit("friend-disconnected")
                        rooms.splice(indx, 1)
                    }
                })
            })
            console.log("rooms.length :", rooms.length)
        });
    })
}

module.exports = socket