import React, { useState } from "react";
import NavBar from './NavBar.jsx'
import { useLoggedInContext, useSetLoggedInContext } from './SnackContext.jsx'


export default function SearchContainer() {
  const loggedIn = useLoggedInContext()
  const setLoggedIn = useSetLoggedInContext()

  return(
    <div>
      
    </div>
  
  )
}