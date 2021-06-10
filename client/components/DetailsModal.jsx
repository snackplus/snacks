import React, { useState } from "react";
import { useLoggedInContext } from './SnackContext.jsx';
import Modal from "react-modal";
import Comment from "./Comment.jsx";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

//need to import context
export default function DetailsModal(props) {
  const isLoggedIn = useLoggedInContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [comments, setComments] = useState(null);
  const [info, setInfo] = useState(null);
  //set state of login details for a user with username and password

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setInfo(null);
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

  const hideComments = () => {
    
  }

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
        if (!data.length) return setInfo('This snack has no reviews! Add one above.')
        setInfo(null);
        setComments(data);
      });
  };

  const addComment = () => {
    if (!isLoggedIn) { setModalIsOpenToFalse(); props.setLoginModal(true); return; }

    console.log('adding comment')

    let input = document.getElementById(props.box.snack_id);

    if (!stars) return setInfo('Add a rating!');
    if (input.value === '') return setInfo('Add your review!');

    console.log("inputtedrating: ", stars);

    fetch("/snack/addSnackComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snack_id: props.box.snack_id,
        rating: stars,
        comment: input.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) return setInfo('Already reviewed!');
        input.value = '';
        setInfo(null);
        setComments(data);
      });
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
        <button onClick={setModalIsOpenToFalse}>x</button>
        <div className="detailContainer">
          <div>Brand: {props.box.brand_name}</div>
          <div>Name: {props.box.snack_name}</div>
          <img src={props.box.img} alt="delicious snack" />
          <div>Average Rating: {props.box.rating}</div>
          <div>Origin: {props.box.origin}</div>
          <div>Flavor Profile: {props.box.flavor_profile}</div>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="simple-controlled"
              value={stars}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
          </Box>
          <div className="commentInputButtons">
            <input
              id={props.box.snack_id}
              className="addCommentClass"
              type="text"
              placeholder="What say you?"
            />
            <div className="commentButtons">
              <button onClick={addComment}>Add Comment</button>
              <button onClick={seeComments}>See Comments</button>
            </div>
          </div>

          <div className='Comments'>
            {comments &&
              comments.map((el) => (
                <Comment
                  username={el.user_id}
                  rating={el.rating}
                  comment={el.comment}
                  comment_id={el.comment_id}
                />
              ))}
          </div>
          <div className='detailsInfo'>{info}</div>
        </div>
      </Modal>
    </div>
  );
}
