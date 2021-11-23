import './style.css'
import { WelcomePage } from '../pages/WelcomePage'
import { ChatPage } from '../pages/ChatPage'
import { usePageVisibility } from './usePageVisibility'

function App() {
  const [pageVisibility, pageChange] = usePageVisibility([
    { name: 'welcome', visibility: true },
    { name: 'chat', visibility: false }
  ])

  let url = `${process.env.WEBSOCKET_URL}/ws`
  let socket

  const openSocket = () => {
    socket = new WebSocket(url)
    // handle incoming messages

    socket.onopen = function (event) {
      console.log('connected')
    }
    socket.onerror = function (event) {
      console.log(event)
    }
    socket.onmessage = function (event) {
      showMessage(event.data)
    }

    socket.onclose = (event) => console.log(`Closed ${event.code}`)
  }

  const showMessage = (dataStr) => {
    let data = JSON.parse(dataStr)
    switch (data.event) {
      case 'new-login':
        /*
        messages.innerHTML = ''
        message.value = ''
        document.title = nick.value
        updateNickList(data)
        
        changeSection('chat')
        */
        break
      case 'send-new-message':
        //message.value = ''
        //appendNewMessage(data)
        break
      case 'update-nick-list':
        //updateNickList(data)
        break
      case 'update-new-message':
        //appendNewMessage(data)
        break
      default:
        console.log('default show message')
        break
    }
  }
  /*
  const appendNewMessage = (data) => {
    let messageElem = document.createElement('div')
    messageElem.textContent = `${data.payload.nick}: ${data.payload.message}`
    document.getElementById('messages').append(messageElem)
  }

  const updateNickList = (data) => {
    let listItem
    console.log(data.payload.nicks)
    onlineList.innerHTML = ''
    for (let n of data.payload.nicks) {
      listItem = document.createElement('p')
      listItem.innerText = n
      onlineList.append(listItem)
    }
  }
*/
  return (
    <>
      <WelcomePage
        visible={pageVisibility[0].visibility}
        pageChange={pageChange}
      />
      <ChatPage
        visible={pageVisibility[1].visibility}
        pageChange={pageChange}
      />
    </>
  )
}

export default App
