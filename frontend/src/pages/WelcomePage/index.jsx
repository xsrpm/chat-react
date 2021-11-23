import './style.css'

export const WelcomePage = ({ visible, pageChange }) => {
  const onClick = () => {
    /*
    let outgoingMessage = JSON.stringify({
      event: "new-login",
      payload: {
        nick: nick.value,
        message: "Connected",
      },
    });
    socket.send(outgoingMessage)
    */
    pageChange('chat')
  }
  if (!visible) return null
  return (
    <section className='WelcomePage'>
      <h1>Chat</h1>
      <p>
        <label>
          Nick: <input type='text' id='nick' />
        </label>
      </p>
      <p>
        <button id='btnLogin' onClick={onClick}>
          Ingresar
        </button>
      </p>
    </section>
  )
}
