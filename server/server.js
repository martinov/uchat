const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./message');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const publicPath = path.join(__dirname, '../build');
app.use(express.static(publicPath));

app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from API!"}');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(publicPath, 'index.html'));
});

io.on('connection', (socket) => {
    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the uChat app!')
    );

    socket.broadcast.emit(
      'newMessage',
      generateMessage('Admin', `New user (${socket.id}) joined the chat.`)
    );

    // socket.on('disconnect', () => {
    //   console.log('client disconnected');
    // });

    socket.on('createMessage', (m) => {
      io.emit('newMessage', generateMessage(m.from, m.text));
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`uChat is running on ${PORT}`);
});
