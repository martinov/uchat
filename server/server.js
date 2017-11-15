const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./message');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const publicPath = path.join(__dirname, '../build');
app.use(express.static(publicPath));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(publicPath, 'index.html'));
});

let userList = {};

io.on('connection', socket => {
  let socketId = socket.id;

  socket.on('enter', (info, cb) => {
    userList[socketId] = info;
    // socket.broadcast.emit('enterUser', userList[socketId]);
    io.emit('updateUserList', userList);
    socket.emit('uid', socketId);
    // cb({ uid: socketId });
    /*
    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the uChat app!')
    );
    socket.broadcast.emit(
      'newMessage',
      generateMessage('Admin', `New user (${socket.id}) joined the chat.`)
    );
    */
  });

  socket.on('createMessage', ({ from, to: sendToSocketId, text }, cb) => {
    const newMsg = generateMessage(from, sendToSocketId, text);
    if (sendToSocketId === 'mainChat') {
      socket.broadcast.emit('newMessage', newMsg);
    } else if (!!userList[sendToSocketId]) {
      io.to(sendToSocketId).emit('newMessage', newMsg);
    }
    cb(newMsg);
  });

  socket.on('disconnect', () => {
    if (userList.hasOwnProperty(socketId)) {
      socket.broadcast.emit('leaveUser', userList[socketId].username);
      delete userList[socketId];
    }
    socket.broadcast.emit('updateUserList', userList);
  });

  socket.on('isTyping', isTyping => {
    socket.broadcast.emit('userIsTyping', {
      socketId,
      isTyping
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`uChat is running on ${PORT}`);
});
