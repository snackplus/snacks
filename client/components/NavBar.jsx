import React from 'react';
import LoginModal from './LoginModal.jsx'
import AddSnackModal from './AddSnackModal.jsx'
import { useLoggedInContext } from './SnackContext.jsx'

export default function NavBar () {
//we need logged in state/context
const isLoggedIn = useLoggedInContext()
let string = ''
if (isLoggedIn === false){
  string = 'false'
} else {
  string = 'true'
}


  return (
    <div className='navBar'>
      {/* <h1>This is Nav Bar {string}</h1> */}
      <AddSnackModal />
      <LoginModal />

    </div>
  )
}