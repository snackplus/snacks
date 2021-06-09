import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Comment from "./Comment.jsx";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//need to import context
export default function DetailsModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [comments, setComments] = useState(null);
  //set state of login details for a user with username and password

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
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

  //snack_id, user_id, rating, comment, comment_id(DEFAULT)
  const seeComments = () => {
    //get all of the comments on load
    fetch("/snack/snackComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snack_id: props.box.snack_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  };

  const addComment = () => {
    let input = document.getElementById(props.box.snack_id).value;
    
    let inputted_rating = stars;
    console.log("inputtedrating: ", inputted_rating);
    let username = "username";

    fetch("/snack/addSnackComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snack_id: props.box.snack_id,
        user_id: username,
        rating: inputted_rating,
        comment: input,
      }),
    })
      .then((res) => res.json())
      .then((data) => setComments(data));
  };
  //snack_id, snack_name, brand_name, origin, type, flavor_profile, rating, img
  return (
    <div>
      <button onClick={setModalIsOpenToTrue}>Details</button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={setModalIsOpenToFalse}
        appElement={document.getElementById("root")} //this is where the modal gets hung (is in relationto)
      >
        <div className="loginContainer">
          <button onClick={setModalIsOpenToFalse}>x</button>
          <div>Brand: {props.box.brand_name}</div>
          <div>Name: {props.box.snack_name}</div>
          <img src={props.box.img} alt="delicious snack" />
          <div>Rating: {props.box.rating}</div>
          <div>Origin: {props.box.origin}</div>
          <div>Flavor: {props.box.flavor_profile}</div>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend"></Typography>
            <Rating name="simple-controlled"
              value={stars}
              onChange={(event, newStars) => {
                setStars(newStars);
              }} />
          </Box>
          <input
            id={props.box.snack_id}
            className="addCommentClass"
            type="text"
          />
          <button onClick={addComment}>Add Comment</button> 
   
          <button onClick={seeComments}>See Comments</button>

          <div className='Comments'>
            {comments &&
              comments.map((el) => (
                <Comment
                  username={el.user_id}
                  rating={el.rating}
                  comment={el.comment}
                />
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
