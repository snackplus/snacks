import React, { useState } from 'react';
import Modal from 'react-modal';
import { useLoggedInContext, useSetLoggedInContext } from './SnackContext.jsx';

//need to import context
export default function LoginModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const loggedIn = useLoggedInContext();
  const setLoggedIn = useSetLoggedInContext();
  const [signupStatus, setSignupStatus] = useState(false);
  const [info, setInfo] = useState(null);
  //set state of login details for a user with username and password

  //create state vars related to signedin context
  //TODO HANDLE LOGIN REQUEST
  //set the context of login to true
  //TODO HANDLE SIGNUP REQUEST
  //set the context of login to true

  const login = () => {
    const username = document.getElementById("username"), password = document.getElementById("password");
    if (username.value === '') return setInfo('No Username!');
    if (password.value === '') return setInfo('No Password!');

    fetch('/user/login',{
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === 'noUser') return setInfo('Username not found!');
        if (data.status === 'wrongPassword') return setInfo('Wrong Password!');
        setInfo(null)
        setLoggedIn(true);
    })
  }

  const signup = () => {
    const username = document.getElementById("username"), password = document.getElementById("password"), confPassword = document.getElementById("confPassword");
    if (username.value === '') return setInfo('No Username!');
    if (password.value === '') return setInfo('No Password!');
    if (confPassword.value === '') return setInfo('Please confirm your password.');

    if (password.value !== confPassword.value) return setInfo('Passwords don\'t match.'); password.value = ''; confPassword.value = '';

    fetch('/user/signup',{
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === 'userExists') return setInfo('Username already exists.');
        setInfo(null)
        setLoggedIn(true);
    })
  }

  let signInOut = [<div>
                      <button onClick={() => login()}>Login</button>
                      <button onClick={() => setSignupStatus(true)}>Signup</button>
                    </div>]
  if (signupStatus) signInOut = [<div>
                                  <input id="confPassword" className='password' placeholder='Confirm Password' />
                                  <button onClick={() => signup()}>Signup</button>
                                  <button onClick={() => {setSignupStatus(false); setInfo(null);}}>Back</button>
                                </div>]

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true)
  }

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#FFFAF1'
    }
  };

  return (
    <div>
      <button onClick={setModalIsOpenToTrue}>Login</button>
      <Modal style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={setModalIsOpenToFalse}
        appElement={document.getElementById('root')} //this is where the modal gets hung (is in relationto)
      >
        <div className="loginContainer">
          <button onClick={setModalIsOpenToFalse}>x</button>
          <input id="username" className='username' placeholder='UserName' />
          <input id="password" className='password' placeholder='Password' />
          {signInOut}
          <div className="loginSignupInfo">{info}</div>
        </div>
      </Modal>
    </div>
  )
}