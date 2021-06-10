import React, { useEffect, useState } from "react";
import Modal from "react-modal";


//need to import context
export default function FilterModal(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  const handleClick = (e) => {
    e.preventDefault();
    let array = []
    const elements = document.getElementById('filterForm').children;
    for (let i = 0; i < elements.length; i += 1){
      if (elements[i].checked){
        array.push(elements[i].defaultValue)
      }
    }
    console.log('array of checked?', array)
    props.setQueryArray(array)
    console.log(props.queryArray)
  }
  


  //snack_id, snack_name, brand_name, origin, type, flavor_profile, rating, img
  return (
    <div>
      <button onClick={setModalIsOpenToTrue}>Filter</button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={setModalIsOpenToFalse}
        appElement={document.getElementById("root")} //this is where the modal gets hung (is in relationto)
      >
        <div className="filterContainer">
        
        <form id='filterForm' action="">
            <p>Flavor Profile:</p>
            <input type="checkbox" id="sweet" name="sweet" value="sweet" />
            <label htmlFor="sweet">Sweet</label>
            <input type="checkbox" id="salty" name="salty" value="salty" />
            <label htmlFor="salty">Salty</label>
            <input type="checkbox" id="sour" name="sour" value="sour" />
            <label htmlFor="sour">Sour</label>
            <input type="checkbox" id="spicy" name="spicy" value="spicy" />
            <label htmlFor="spicy">Spicy</label>
            <input type="checkbox" id="bitter" name="bitter" value="bitter" />
            <label htmlFor="bitter">Bitter</label>

            <p>Type:</p>
            <input type="checkbox" id="chips" name="chips" value="chips" />
            <label htmlFor="chips">Chips</label><br />
            <input type="checkbox" id="candy" name="candy" value="candy" />
            <label htmlFor="candy">Candy</label><br />
            <input type="checkbox" id="beverage" name="beverage" value="beverage" />
            <label htmlFor="beverage">Beverage</label><br />
            <input type="checkbox" id="fruit" name="fruit" value="fruit" />
            <label htmlFor="fruit">Fruit</label><br />
            {/* <input type="submit" name="submit" onClick={handleClick} value="inputSubmit" /> */}
            <button onClick={handleClick} id='filterInputButton'type="submit" value="Submit">Submit Your Filters</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
