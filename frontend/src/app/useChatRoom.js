import { useState } from 'react'
import { usePageVisibility } from './usePageVisibility'

export function useChatRoom() {
  const [pageVisibility, pageChange] = usePageVisibility([
    { name: 'welcome', visibility: true },
    { name: 'chat', visibility: false }
  ])
  const [nick, setNick] = useState('')
  const [nicksInRoom, setNicksInRoom] = useState([])
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(undefined)
  let url = `${process.env.REACT_APP_WEBSOCKET_URL}/ws`

  function joinRoom() {
    console.log(url)
    let socket = new WebSocket(url)
    socket.onopen = function (event) {
      console.log('connected')
      let outgoingMessage = JSON.stringify({
        event: 'new-login',
        payload: {
          nick,
          message: 'Connected'
        }
      })
      socket.send(outgoingMessage)
    }
    socket.onerror = function (event) {
      console.log(event)
    }
    socket.onmessage = function (event) {
      console.log('socket onmessage')
      let data = JSON.parse(event.data)
      switch (data.event) {
        case 'new-login':
          document.title = nick
          console.log('new-login:' + data.payload.nicks)
          setNicksInRoom(data.payload.nicks)
          pageChange('chat')
          break
        case 'send-new-message':
          console.log(data)
          //appendNewMessage(data)
          setMessages((messages) => {
            return [
              ...messages,
              `${data.payload.nick}: ${data.payload.message}`
            ]
          })
          break
        case 'update-nick-list':
          setNicksInRoom(data.payload.nicks)
          break
        case 'update-new-message':
          //appendNewMessage(data)
          console.log(data)
          setMessages((messages) => {
            return [
              ...messages,
              `${data.payload.nick}: ${data.payload.message}`
            ]
          })
          break
        default:
          console.log('default show message')
          break
      }
    }

    socket.onclose = (event) => console.log(`Closed ${event.code}`)
    setSocket(socket)
  }

  function sendMessage(message) {
    let outgoingMessage = JSON.stringify({
      event: 'send-new-message',
      payload: {
        nick,
        message
      }
    })
    socket.send(outgoingMessage)
  }

  function leaveRoom() {
    socket.close(1000, 'close chat')
    setMessages([])
    pageChange('welcome')
  }
  return [
    pageVisibility,
    nicksInRoom,
    messages,
    sendMessage,
    joinRoom,
    leaveRoom,
    setNick,
    nick
  ]
}
