const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`uChat is running on ${PORT}`);
});
