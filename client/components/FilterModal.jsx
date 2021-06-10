import React, { useEffect, useState } from "react";
import Modal from "react-modal";


//need to import context
export default function FilterModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [queryArray, setQueryArray] = useState([]);
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
        <div className="filterContainer">

        </div>
      </Modal>
    </div>
  );
}
