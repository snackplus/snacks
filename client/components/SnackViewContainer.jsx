import React, { useState } from 'react';
import SnackBox from './SnackBox.jsx';
import SnackBoxContainer from './SnackBoxContainer.jsx';
import { useSnackArrayContext, setSnackArrayContext } from './SnackContext.jsx';




export default function SnackViewContainer() {
  const snackArray = useSnackArrayContext();
  const setSnackArray = setSnackArrayContext();
  const temp = [<SnackBox />]
  const search = () => {
    //fetch request
    //set state of the snacks array here
    setSnackArray(temp)
    console.log(snackArray)
  }

  const filter = () => {
    
  }

  return (
    <div>
      
      <input className="searchSnack" type="text" placeholder="What is your desire?" />
      <button onClick={search}>Search</button>

      {snackArray}
      <SnackBoxContainer  />
    </div>

  )
}