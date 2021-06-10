import React from 'react';
import LoginModal from './LoginModal.jsx'
import AddSnackModal from './AddSnackModal.jsx'

export default function NavBar(props) {
  return (
    <div className='navBar'>
      {/* <h1>This is Nav Bar {string}</h1> */}
      <AddSnackModal setLoginModal={props.setLoginModal} />
      <LoginModal setLoginModal={props.setLoginModal} modalIsOpen={props.modalIsOpen} />

    </div>
  )
}