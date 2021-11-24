import './style.css'
import { WelcomePage } from '../pages/WelcomePage'
import { ChatPage } from '../pages/ChatPage'
import { useChatRoom } from './useChatRoom'

function App() {
  const [
    pageVisibility,
    nicksInRoom,
    messages,
    sendMessage,
    joinRoom,
    leaveRoom,
    setNick,
    nick
  ] = useChatRoom()

  return (
    <>
      <WelcomePage
        visible={pageVisibility[0].visibility}
        setNick={setNick}
        nick={nick}
        joinRoom={joinRoom}
      />
      <ChatPage
        visible={pageVisibility[1].visibility}
        leaveRoom={leaveRoom}
        sendMessage={sendMessage}
        nicksInRoom={nicksInRoom}
        messages={messages}
      />
    </>
  )
}

export default App
