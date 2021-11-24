const express = require('express')
const cors = require('cors')
const WebSocket = require('ws')
const app = express()
app.use(cors())
app.use(express.static('../frontend/build'))
const wss = new WebSocket.Server({ noServer: true })
const clients = wss.clients

let nicks

function updateNickList(ws, nicks) {
  console.log(nicks)
  for (const client of clients) {
    if (client !== ws) {
      client.send(
        JSON.stringify({
          event: 'update-nick-list',
          payload: { nicks: nicks }
        })
      )
    }
  }
}

function updateSendedMessage(ws, msg) {
  for (const client of clients) {
    if (client !== ws) {
      client.send(
        JSON.stringify({
          event: 'update-new-message',
          payload: { nick: msg.payload.nick, message: msg.payload.message }
        })
      )
    }
  }
}

function sendMessage(message, ws) {
  console.log(`message received: ${message}`)
  const msg = JSON.parse(message)
  switch (msg.event) {
    case 'new-login':
      ws.nick = msg.payload.nick
      nicks = Array.from(clients).map((c) => c.nick)
      ws.send(JSON.stringify({ event: 'new-login', payload: { nicks: nicks } }))
      updateNickList(ws, nicks)
      break
    case 'send-new-message':
      ws.send(message)
      updateSendedMessage(ws, msg)
      break
  }
}

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    sendMessage(data, ws)
  })
  ws.on('error', function (event) {
    console.log(event)
  })
  ws.on('close', function () {
    console.log('connection closed')
    nicks = Array.from(clients).map((c) => c.nick)
    updateNickList(ws, nicks)
  })
})

const server = app.listen(process.env.PORT || 8080)

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit('connection', socket, request)
  })
})
