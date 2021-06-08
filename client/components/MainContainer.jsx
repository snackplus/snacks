import React, { useState } from "react";
import NavBar from './NavBar.jsx'
import { useLoggedInContext, useSetLoggedInContext } from './SnackContext.jsx'
import SnackBoxContainer from './SnackBoxContainer.jsx'

export default function MainPage() {

  const loggedIn = useLoggedInContext()
  const setLoggedIn = useSetLoggedInContext()
  let string = '';
  if (loggedIn === true) {
    string = 'true'
  } else {
    string = 'false'
  }
  return(
    <div>
      <NavBar />
      <div>This is the Main Page and you are logged in: {string} </div>
      <button onClick={setLoggedIn}>Click it</button>
      <SnackBoxContainer />
    </div>
    
  )
}