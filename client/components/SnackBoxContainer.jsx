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

  // boxArray.map(el=> {
  //   console.log(el)
  // })
  // function loadData() {
  //   const response = fetch('/snack/')
  //   const data = response.json()
  //   setBoxArray(data)
  // }
  // boxArray.map(el => {
  //   <SnackBox key={el.snack_id}
  //     id={el.snack_id}
  //     image={el.img}
  //     brand={el.brand_name}
  //     name={el.snack_name}
  //     origin={el.origin}
  //     rating={el.rating}
  //     flavorProfile={el.flavor_profile}
  //     type={el.type} />
  // })

  return (
    <div>
      <div className='SearchContainer'>
      <input id="" className="Search" type="text" />
      <button>Search</button>
      </div>
      <h3>This is SnackBox Container</h3>
        <div className='SnackBoxContainer'>
        {
          boxArray && boxArray.map(el => <SnackBox box={el}/>)
        }
        </div>
    </div>


  )
}