import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function SnackBox (props) {

  return (
    <div key={props.key} id={props.id} className="snackBox">
        <a href={props.image}></a>
        <br/>
        <h3>{props.brand}</h3>
        {/* image, name, average star rating, number of reviews */}
        <h3>{props.name}</h3>
        <h4>{props.origin}</h4>
      
    </div>
      


  )
}