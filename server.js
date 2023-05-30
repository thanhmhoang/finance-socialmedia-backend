const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');
const cors = require('cors')
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(routes);
app.use(cors())
const server = require('http').Server(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001"
  }
});

io.on('connection', socket => {
  socket.on('send-chat-message', message =>{
    socket.broadcast.emit('chat-message',message)
  })
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});