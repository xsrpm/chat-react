import './style.css'

export const WelcomePage = ({ visible, setNick, nick, joinRoom }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    if (e.target[0].value.length > 0) {
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
            Nick:{' '}
            <input value={nick} onChange={onChange} type='text' required />
          </label>
        </p>
        <p>
          <button id='btnLogin'>Ingresar</button>
        </p>
      </form>
    </section>
  )
}
