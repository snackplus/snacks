import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DetailsModal from "./DetailsModal.jsx";

export default function SnackBox(props) {
  return (
    <div className="SnackBox">
      <div key={props.box.snack_id}>
        <div className='ImageDiv'>
          <img src={props.box.img} alt="delicious" />
        </div>
        <h3 className='WordWrap'>
          {props.box.brand_name} {props.box.snack_name}
        </h3>
        <h4 className='WordWrap'>{props.box.origin}</h4>
        <div className="ratingStars">
          <Box component="fieldset" borderColor="transparent">
            <Typography component="legend"></Typography>
            <Rating
              name="read-only"
              value={props.box.rating}
              readOnly
            />
          </Box>
          <h4 className='ratingValue'>{props.box.rating}/5</h4>
        </div>
        <DetailsModal box={props.box} setLoginModal={props.setLoginModal} />
      </div>
    </div>
  );
}
