import './style.css'

export const WelcomePage = ({ visible, nick, setNick, joinRoom }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    if (e.target[0].value.length > 0) {
      setNick(e.target[0].value)
      joinRoom()
    }
  }
  const onChange = (e) => {
    setNick(e.target.value)
  }
  if (!visible) return null
  return (
    <section className='WelcomePage'>
      <form onSubmit={onSubmit}>
        <h1>Chat</h1>
        <p>
          <label>
            Nick: <input nick={nick} onChange={onChange} type='text' required />
          </label>
        </p>
        <p>
          <button id='btnLogin'>Ingresar</button>
        </p>
      </form>
    </section>
  )
}
