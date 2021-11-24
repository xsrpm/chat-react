import { useState } from 'react'
import './style.css'

export const ChatPage = ({
  visible,
  leaveRoom,
  sendMessage,
  nicksInRoom,
  messages
}) => {
  const [message, setMessage] = useState('')
  const onChange = (e) => {
    setMessage(e.target.value)
  }
  function onLogoutClick() {
    leaveRoom()
  }
  const onSubmit = (e) => {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }
  if (!visible) return null
  return (
    <section className='ChatPage'>
      <h1>Sala de chat</h1>
      <form onSubmit={onSubmit}>
        <div className='ChatPage__messages' id='messages'>
          {messages.map((msg) => (
            <div key={msg} className='ChatPage__message'>
              {msg}
            </div>
          ))}
        </div>
        <div className='ChatPage__online' id='online'>
          <h3>En línea</h3>
          <div>
            {nicksInRoom.map((nick) => (
              <p key={nick}>{nick}</p>
            ))}
          </div>
        </div>

        <textarea
          className='ChatPage__message'
          value={message}
          onChange={onChange}
          placeholder='Escribe tu mensaje...'
        ></textarea>
        <button className='ChatPage__btnSend'>Enviar</button>
      </form>
      <button className='ChatPage__btnLogout' onClick={onLogoutClick}>
        Cerrar sesión
      </button>
    </section>
  )
}
