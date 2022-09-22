const express = require('express');
const cors = require("cors")
const http = require('http');
const PORT = process.env.PORT || 3000
const errorHandler = require("./middlewares/errorHandler")
require("dotenv").config()

const connectDB = require("./config/db");

connectDB()
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Chat with end to end encryption</h1>');
});

app.use("/api/users", require("./routes/userRoutes.js"))

app.use(errorHandler)
io.on('connection', (socket) => {
    socket.on("message", (message) => {
        console.log(message)
    })
    console.log('a user connected', socket.id);
});


app.listen(PORT, () => {
    console.log('listening on *:3000');
});
