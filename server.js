const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express()
app.use(express.static(path.join(__dirname, 'client')))
const server = http.createServer(app)
const io = socketIo(server);



io.on('connection', socket => {
    socket.emit("userMessage", {
        hendle: "Chat Bot",
        message: "Hi there"
    })
    socket.broadcast.emit("userMessage", {
        hendle: "Chat Bot",
        message: "User has joined"
    })
    console.log(`Client has connected ${socket.id}`);

    socket.on("userMessage", data => {
        io.sockets.emit("userMessage", data)
        console.log(data);
    })
    socket.on("userTyping", data => {
        socket.broadcast.emit("userTyping", data)
    })
    socket.on("disconnected", () => {
        console.log("disconnected");

        io.emit("userMessage", {
            hendle: "Chat Bot",
            message: "User has left"
        })
    })
})



app.get('/', (req, res) => {
    res.sendFile(__dirname, '/index.html')
})





const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));