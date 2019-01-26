const express = require('express');
const socket = require('socket.io')

const app = express();
const server = app.listen(4000, () => {
    console.log('Server running...')
})

app.use(express.static('public'))

users = [];
connections = [];


const io = socket(server);

io.on('connection', socket => {
    console.log("Made socket connection", socket.id)


    // Handle chat event
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });
    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})