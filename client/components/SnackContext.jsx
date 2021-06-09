import React, { useContext, useState } from 'react'

//create context for logged in status and set status func
const LoggedInContext = React.createContext()
const SetLoggedInContext = React.createContext()

const SnackArrayContext = React.createContext()
const SetSnackArrayContext = React.createContext()

//make two custom hooks here that exports the above context
export function useLoggedInContext() {
  return useContext(LoggedInContext)
}

export function useSetLoggedInContext() {
  return useContext(SetLoggedInContext)
}

//two custom Hooks
export function useSnackArrayContext() {
  return useContext(SnackArrayContext)
}
export function setSnackArrayContext(item) {
  return useContext(SetSnackArrayContext)
}

//provides exportable context?
export function LoggedInProvider ({ children }) {
  //creates the state
  const [loggedIn, setIsLoggedIn] = useState(false)
  const [snackArray, setSnackArray] = useState(null)

  //updates the state
  function toggleLoggedIn(bool) {
    setIsLoggedIn(isLoggedIn => bool) 
  };

  function fillSnackArray(item) {
    // console.log('in context fill array ', [...item])
    setSnackArray(newArray => [...item])
  }
  return (
    <SnackArrayContext.Provider value={snackArray}>
      <SetSnackArrayContext.Provider value={fillSnackArray}>

        <LoggedInContext.Provider value={loggedIn}>
          <SetLoggedInContext.Provider value={toggleLoggedIn}>
            {children}
          </SetLoggedInContext.Provider>
        </LoggedInContext.Provider>

      </SetSnackArrayContext.Provider>
    </SnackArrayContext.Provider>    
  )

}