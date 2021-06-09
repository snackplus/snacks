import React, { useEffect, useState } from 'react';
import SnackBox from './SnackBox.jsx';
import { useSnackArrayContext, setSnackArrayContext } from './SnackContext.jsx';

//HOMEPAGE input filtermethod <SnackBoxContainer filters = {}/>
// function setSnackState() {

//   // const boxArray = [];

//   fetch('/snack/')
//     .then(res => res.json())
//     .then((data) => {
//       console.log("boxArray updated ", data);
//       boxArray = data;
//     })
//     .then(console.log('new state ', boxArray))
//     .catch(err => {
//       console.log("error: snackboxcontainer")
//     })

// }

export default function SnackBoxContainer(boxArray) {
  // //sort method takes props from upper component
  // //upper component decides how sort 
  // //if props.sortmethod = rating boxArray.
  // //else if 
  // const [snackBoxData, setsnackBoxData] = useState(null);
  // let local = [];
  // //const [updatedLocal, setLocal] = useState(null)
  // // setsnackBoxData(boxArray);
  // // const boxArray = useSnackArrayContext();
  // // const setBoxArray = setSnackArrayContext();

  // useEffect(() => {

  //   fetch('/snack/')
  //     .then(res => res.json())
  //     .then((data) => {
  //       console.log("boxArray updated ", data);
  //       setsnackBoxData(data);
  //     })
  //     .then(console.log('new state ', snackBoxData))
  //     .catch(err => {
  //       console.log("error: snackboxcontainer")
  //     })

  // }, []);

  // useEffect(() => {
  //   let array = [];
  //   snackBoxData.forEach(e => {
  //     array.push(
  //       <SnackBox key={e.snack_id}
  //         id={e.snack_id}
  //         image={e.img}
  //         brand={e.brand_name}
  //         name={e.snack_name}
  //         origin={e.origin}
  //         rating={e.rating}
  //         flavorProfile={e.flavor_profile}
  //         type={e.type} />
  //     )
  //   })
  //   local = array;

  // }, [snackBoxData])



  // // boxArray.map(el => {
  // //   <SnackBox key={el.snack_id}
  // //     id={el.snack_id}
  // //     image={el.img}
  // //     brand={el.brand_name}
  // //     name={el.snack_name}
  // //     origin={el.origin}
  // //     rating={el.rating}
  // //     flavorProfile={el.flavor_profile}
  // //     type={el.type} />
  // // })

  // // const search = () => {
  // //   //fetch request by name of snack or brand

  // //   //useSnackArrayContext and update the list of boxes
  // // }
  // // const filter = () => {
  // //   //fetch request by name of snack or brand
  // //   //useSnackArrayContext and update the list of boxes
  // // }

  return (
    <div>
    //   <div>
         {/* Search */}
        <input id="" className="Search" type="text" />
        <button>Search</button>
       {/* Filter */}

        <h3>This is SnackBox Container</h3>
        {/* {local} */}
       </div>
    </div>

  )
}