const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const WebSocket = require('ws');
const url = 'ws://stocks.mnet.website';

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const cors = require('cors')

const router = require ('./router')

// Port 5000 used in local setup.
// When running in production mode, the process.env will get a port automatically
const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
  const ws = new WebSocket(url);

  ws.on('open', function open() {
    ws.send('something');
  });

  ws.on('message', function incoming(data) {
    socket.emit('message', data)
  });

  socket.on('disconnect', () => {
    console.log('User left!')
  })
})

app.use(router)
app.use(cors)

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
