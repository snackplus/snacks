import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useLoggedInContext, useSetLoggedInContext } from "./SnackContext.jsx";

//need to import context
export default function DetailsModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      body: JSON.stringify([props.box.snack_id]),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      });
  };

  const addComment = () => {
    // fetch()
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
          <img href={props.box.img} alt="delicious snack" />
          <div>Rating: {props.box.rating}</div>
          <div>Origin: {props.box.origin}</div>
          <div>Flavor: {props.box.flavor_profile}</div>
          <button onClick={seeComments}>See Comments</button>
          <div>{comments && comments.map((el) => <div>{el.comment}</div>)}</div>
        </div>
      </Modal>
    </div>
  );
}
