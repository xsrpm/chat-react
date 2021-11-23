import react from 'react'
const AppContext = react.createContext()

function AppProvider({ children }) {
  return (
    <AppContext.Provider value={{ socket }}>{children}</AppContext.Provider>
  )
}

export { AppProvider, AppContext }
