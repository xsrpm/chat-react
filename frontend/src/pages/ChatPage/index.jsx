import './style.css'

export const ChatPage = ({ visible, pageChange }) => {
  const onLogoutClick = () => {
    pageChange('welcome')
  }
  if (!visible) return null
  return (
    <section className='ChatPage' id='chat'>
      <h1>Sala de chat</h1>
      <div className='ChatPage__messages' id='messages'></div>
      <div className='ChatPage__online' id='online'>
        <h3>En línea</h3>
        <div id='onlineList'></div>
      </div>
      <textarea className='ChatPage__message' id='message'></textarea>
      <button className='ChatPage__btnSend' id='btnSend'>
        Enviar
      </button>
      <button
        className='ChatPage__btnLogout'
        onClick={onLogoutClick}
        id='btnLogout'
      >
        Cerrar sesión
      </button>
    </section>
  )
}
