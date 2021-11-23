import './style.css'

export const ChatPage = ({ visible, pageChange }) => {
  const onLogoutClick = () => {
    //socket.close(1000, "close chat");
    pageChange('welcome')
  }
  const onSendClick = () => {
    /*
    let outgoingMessage = JSON.stringify({
      event: 'send-new-message',
      payload: {
        nick: nick.value,
        message: message.value
      }
    })

    socket.send(outgoingMessage)
    */
  }
  if (!visible) return null
  return (
    <section className='ChatPage'>
      <h1>Sala de chat</h1>
      <div className='ChatPage__messages' id='messages'></div>
      <div className='ChatPage__online' id='online'>
        <h3>En línea</h3>
        <div id='onlineList'></div>
      </div>
      <textarea className='ChatPage__message' id='message'></textarea>
      <button className='ChatPage__btnSend' onClick={onSendClick}>
        Enviar
      </button>
      <button className='ChatPage__btnLogout' onClick={onLogoutClick}>
        Cerrar sesión
      </button>
    </section>
  )
}
