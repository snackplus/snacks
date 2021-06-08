import React, { useContext, useState } from 'react'

//create context for logged in status and set status func
const LoggedInContext = React.createContext()
const SetLoggedInContext = React.createContext()

//make two custom hooks here that exports the above context
export function useLoggedInContext() {
  return useContext(LoggedInContext)
}

export function useSetLoggedInContext() {
  return useContext(SetLoggedInContext)
}

//provides exportable context?
export function LoggedInProvider ({ children }) {
  //creates the state
  const [loggedIn, setIsLoggedIn] = useState(false)
  //updates the state
  function toggleLoggedIn() {
    setIsLoggedIn(isLoggedIn => !isLoggedIn) 
  };
  return (
    <LoggedInContext.Provider value={loggedIn}>
      <SetLoggedInContext.Provider value={toggleLoggedIn}>
        {children}
      </SetLoggedInContext.Provider>
    </LoggedInContext.Provider>
  )

}