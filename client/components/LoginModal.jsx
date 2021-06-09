import React, { useState } from "react";
import Modal from "react-modal";
import { useSetLoggedInContext, useLoggedInContext } from "./SnackContext.jsx";

//need to import context
export default function LoginModal(props) {
  const setLoggedIn = useSetLoggedInContext(), loggedIn = useLoggedInContext();
  const [signupStatus, setSignupStatus] = useState(false);
  const [info, setInfo] = useState(null);

  console.log(props.modalIsOpen)


  const login = () => {
    const username = document.getElementById("username"),
      password = document.getElementById("password");
    if (username.value === "") return setInfo("No Username!");
    if (password.value === "") return setInfo("No Password!");

    fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ username: username.value, password: password.value.trim() })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === 'noUser') return setInfo('Username not found!');
        if (data.status === 'wrongPassword') return setInfo('Wrong Password!');
        setInfo('Logging in...')
        setLoggedIn(true);
        setTimeout(() => { props.setLoginModal(false); setInfo(null) }, 500);
      })
  }

  const signup = () => {
    const username = document.getElementById("username"), password = document.getElementById("password"), confPassword = document.getElementById("confPassword");
    if (username.value === '') return setInfo('No Username!');
    if (password.value === '') return setInfo('No Password!');
    if (confPassword.value === '') return setInfo('Please confirm your password.');

    if (password.value !== confPassword.value) {
      setInfo('Passwords don\'t match.');
      password.value = '';
      confPassword.value = '';
      return;
    }
    console.log(username.value, password.value)

    fetch('/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ username: username.value, password: password.value.trim() })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === 'userExists') return setInfo('Username already exists.');
        setInfo('Account created! Logging in...')
        setLoggedIn(true);
        setTimeout(() => { props.setLoginModal(false); setInfo(null); setSignupStatus(false); }, 500);
      })
  }

  const logout = () => {
    fetch('/user/logout', { method: 'POST', credentials: 'include' })
      .then(data => data.json())
      .then(() => setLoggedIn(false))
      .catch(err => console.log('ERROR LOGGING OUT: ', err))
  }

  let loginLogout = <button id="loginButton" onClick={() => props.setLoginModal(true)}>Login</button>
  if (loggedIn) loginLogout = <button id="loginButton" onClick={() => logout()}>Logout</button>

  let signInOut = [<div>
    <button onClick={() => login()}>Login</button>
    <button onClick={() => { setSignupStatus(true); setInfo(null); }}>Signup</button>
  </div>]
  if (signupStatus) signInOut = [<div>
    <input id="confPassword" className='password' placeholder='Confirm Password' />
    <button onClick={() => signup()}>Signup</button>
    <button onClick={() => { setSignupStatus(false); setInfo(null); }}>Back</button>
  </div>]

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#FFFAF1",
    },
  };

  return (
    <div>
      {loginLogout}
      <Modal
        style={customStyles}
        isOpen={props.modalIsOpen}
        onRequestClose={() => props.setLoginModal(false)}
        appElement={document.getElementById("root")} //this is where the modal gets hung (is in relationto)
      >
        <div className="loginContainer">
          <button onClick={() => props.setLoginModal(false)}>x</button>
          <input id="username" className="username" placeholder="UserName" />
          <input id="password" className="password" placeholder="Password" />
          {signInOut}
          <div className="loginSignupInfo">{info}</div>
        </div>
      </Modal>
    </div>
  );
}
