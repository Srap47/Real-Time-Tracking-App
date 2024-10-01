const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
        io.emit('receive-location', {id: socket.id, latitude: data.latitude, longitude: data.longitude});
    })
    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
    })
});

app.get('/', (req, res) => {
    res.render("index.ejs");
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
