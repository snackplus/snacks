import React, { useState } from 'react';
import Modal from 'react-modal';
import { useLoggedInContext, useSetLoggedInContext } from './SnackContext.jsx';

//need to import context
export default function LoginModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const loggedIn = useLoggedInContext();
  const setLoggedIn = useSetLoggedInContext();
  //set state of login details for a user with username and password
  const [loginDetails, setLoginDetails] = useState({username: '', password: ''})

  //create state vars related to signedin context
  //TODO HANDLE LOGIN REQUEST
    //set the context of login to true
  //TODO HANDLE SIGNUP REQUEST
    //set the context of login to true


  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }
 
  const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
  }
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#FFFAF1'
    }
};

  return(
    <>
      <button onClick={setModalIsOpenToTrue}>Login</button>
      <Modal style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={setModalIsOpenToFalse}
        appElement={document.getElementById('root')} //this is where the modal gets hung (is in relationto)
        >
        <div className="loginContainer">
          <button onClick={setModalIsOpenToFalse}>x</button>
          <input className='username' placeholder='UserName'onInput={()=>setLoginDetails({username: this.value})} />
          <input className='password' placeholder='Password'onInput={()=>setLoginDetails({password: this.value})} />
          <button onClick={()=>{
              // useSetLoggedInContext(!useSetLoggedInContext())
              handleLogin(loginDetails)
            }}>Login</button>
          <button onClick={()=>handleSignUp(loginDetails)}>Signup</button>
        </div>
      </Modal>
    </>
  )
}