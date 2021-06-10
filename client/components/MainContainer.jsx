import React, { useEffect, useState } from "react";
import NavBar from './NavBar.jsx'
import { useLoggedInContext, useSetLoggedInContext } from './SnackContext.jsx'
import SnackBoxContainer from './SnackBoxContainer.jsx'

export default function MainPage() {
  const setLoggedIn = useSetLoggedInContext()
  const loggedIn = useLoggedInContext();
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState('Welcome! Log-in to add a snack, or cruise through the tasties below.');

  useEffect(() => {
    fetch('/user/verifySession')
      .then(data => data.json())
      .then(data => {
        if (data.status) setLoggedIn(true);
      })
  }, [])


  if (loggedIn) {
    fetch('/user/getName')
      .then(data => data.json())
      .then(data => setWelcomeMsg(`Welcome ${data.username}... get your snack on!`));
  }

  return (
    <div>
      <div className='Logo'>
        <img id='logoImage'src='../assets/Snackplus.png'></img>
      </div>
      <div className='welcomeMsg'>{welcomeMsg}</div>
      <NavBar setWelcomeMsg={setWelcomeMsg} setLoginModal={setLoginModalIsOpen} modalIsOpen={loginModalIsOpen} />
      <SnackBoxContainer setLoginModal={setLoginModalIsOpen} />
    </div>

  )
}