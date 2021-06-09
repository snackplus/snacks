import React from 'react';
import LoginModal from './LoginModal.jsx'
import AddSnackModal from './AddSnackModal.jsx'
import { useLoggedInContext } from './SnackContext.jsx'

export default function NavBar(props) {
  //we need logged in state/context
  const isLoggedIn = useLoggedInContext()
  console.log(props.modalIsOpen)

  return (
    <div className='navBar'>
      {/* <h1>This is Nav Bar {string}</h1> */}
      <AddSnackModal setLoginModal={props.setLoginModal} />
      <LoginModal setLoginModal={props.setLoginModal} modalIsOpen={props.modalIsOpen} />

    </div>
  )
}