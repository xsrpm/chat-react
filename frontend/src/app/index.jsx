import './style.css'
import { WelcomePage } from '../pages/WelcomePage'
import { ChatPage } from '../pages/ChatPage'
import { usePageVisibility } from './usePageVisibility'

function App() {
  const [pageVisibility, pageChange] = usePageVisibility([
    { name: 'welcome', visibility: true },
    { name: 'chat', visibility: false }
  ])

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
