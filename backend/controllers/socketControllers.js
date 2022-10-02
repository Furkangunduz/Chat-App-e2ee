const saveUser = (socket, activeUsers, { name, public_key }) => {
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
    console.log(activeUsers)
}
const startChatRequest = (io, socket, activeUsers, responseWaiters, rooms, public_key) => {
    if (!public_key) {
        socket.emit("wrong-public-key")
        return
    }
    let user = undefined
    let friend = undefined
    activeUsers.forEach((activeUser) => {
        if (activeUser[1] == public_key) {
            friend = activeUser
        }
        if (activeUser[2] == socket.id) {
            user = activeUser
        }
    })
    if (user == undefined || friend == undefined) {
        socket.emit("user-not-online")
        return
    }
    if (friend[2] == socket.id) {
        console.log("cant start chat with yourself.")
        return
    }
    responseWaiters.push({ waiter: user, from: friend })
    rooms.push([user, friend])
    io.to(friend[2]).emit("start-chat-request", user)
}
const chatRequestAccepted = (io, socket, responseWaiters) => {
    responseWaiters.forEach((e, indx) => {
        if (e.from[2] == socket.id) {
            io.to(e.waiter).emit("chat-request-accepted", e.from)
            console.log("responseWaiters length :", responseWaiters.length)
            responseWaiters.splice(indx, 1)
            console.log("responseWaiters length after:", responseWaiters.length)
        }
    })

}
const chatRequestDeclined = (io, socket, rooms, responseWaiters) => {
    responseWaiters.forEach((e, indx) => {
        if (e.from[2] == socket.id) {
            io.to(e.waiter[2]).emit("chat-request-declined")
            socket.emit("chat-request-declined")
            responseWaiters.splice(indx, 1)
            rooms.forEach((room, index) => {
                room.forEach((user) => {
                    if (user[2] == socket.id) {
                        rooms.splice(index, 1)
                    }
                })
            })
        }
    })
}
const userLeft = (io, socket, rooms) => {
    rooms.forEach((room, indx) => {
        room.forEach((user, index) => {
            if (user[2] == socket.id) {
                room.splice(index, 1)
                io.to(room[0][2]).emit("user-left")
                rooms.splice(indx, 1)
            }
        })
    })
}
const newMessage = (io, socket, rooms, messages) => {
    console.log(messages)
    if (!messages) return
    rooms.forEach((room) => {
        room.forEach((user) => {
            if (user[2] != socket.id) {
                io.to(user[2]).emit("new-message", messages)
                return
            }
        })
    })
}
const disconnect = (io, socket, activeUsers, rooms) => {
    activeUsers.forEach((user, index) => {
        if (user[2] == socket.id) {
            activeUsers.splice(index, 1)
        }
    })
    rooms.forEach((room, indx) => {
        room.forEach((user, index) => {
            if (user[2] == socket.id) {
                room.splice(index, 1)
                io.to(room[0][2]).emit("friend-disconnected")
                rooms.splice(indx, 1)
            }
        })
    })
}

module.exports = {
    saveUser,
    startChatRequest,
    chatRequestAccepted,
    chatRequestDeclined,
    userLeft,
    newMessage,
    disconnect
}