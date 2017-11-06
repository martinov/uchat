const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const publicPath = path.join(__dirname, '../build');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`uChat is running on ${port}`);
});
