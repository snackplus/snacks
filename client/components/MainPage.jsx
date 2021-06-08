import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLoggedInContext, useSetLoggedInContext } from './SnackContext'


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
      <div>This is the Main Page and you are logged in: {string} </div>
      <button onClick={setLoggedIn}>Click it</button>
    </div>
    
  )
}