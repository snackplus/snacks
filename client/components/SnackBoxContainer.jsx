import React, { useEffect, useState } from 'react';
import SnackBox from './SnackBox.jsx';
import { useSnackArrayContext, setSnackArrayContext } from './SnackContext.jsx';
// import fetch from 'isomorphic-fetch'

export default function SnackBoxContainer() {
  //sort method takes props from upper component
  //upper component decides how sort 
  //if props.sortmethod = rating boxArray.
  //else if 
  //const [updatedLocal, setLocal] = useState(null)
  // setsnackBoxData(boxArray);
  const boxArray = useSnackArrayContext();
  const setBoxArray = setSnackArrayContext();
  // const [boxArray, setBoxArray] = useState([])
  
  useEffect(() => {

      fetch('/snack/')
        .then(res => res.json())
        .then(data => setBoxArray(data))


  }, []);

  const search = () => {
    const searchQuery = document.getElementById('searchId')
    fetch('/snack/search', {
      Method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([searchQuery])
    })
      .then(res => res.json())
      .then(data => setBoxArray(data))
  }

  return (
    <div>
      <input id="searchId" className="Search" type="text" />
      <button onClick={search}>Search</button>
      <h3>This is SnackBox Container</h3>
      {
        boxArray && boxArray.map(el => <SnackBox box={el}/>)
      }
    </div>


  )
}