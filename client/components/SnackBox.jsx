import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import DetailsModal from "./DetailsModal.jsx";

export default function SnackBox(props) {
  return (
    <div className="SnackBox">
      <div key={props.box.snack_id}>
        <img src={props.box.img} alt="delicious" />
        <h3>
          Snack: {props.box.brand_name} {props.box.snack_name}
        </h3>
        <h4>Origin: {props.box.origin}</h4>
        <h4>Average Rating: {props.box.rating}</h4>
        <Box component="fieldset" borderColor="transparent">
          <Typography component="legend"></Typography>
          <Rating name="read-only" value={parseInt(props.box.rating)} readOnly />
        </Box>
        <DetailsModal box={props.box} setLoginModal={props.setLoginModal}/>
      </div>
    </div>
  );
}
