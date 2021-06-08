import React from 'react'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


export default function SnackBox () {

  return (
    <div>
      {/* image, name, average star rating, number of reviews */}
      <h4>IMAGE</h4>
      <h4>NAME</h4>
      {/* <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />  
      </Box> */}
      <h4>Number of Review</h4>
      
    </div>

  )
}