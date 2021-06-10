import React, { useEffect, useState } from "react";
import SnackBox from "./SnackBox.jsx";
import { useSnackArrayContext, setSnackArrayContext } from "./SnackContext.jsx";
// import fetch from 'isomorphic-fetch'
import Modal from "react-modal";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    text: 'red',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SnackBoxContainer(props) {
  const boxArray = useSnackArrayContext();
  const setBoxArray = setSnackArrayContext();
  const [filter, setFilter] = useState(false);
  const [query, setQueryArray] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const classes = useStyles()
  const [type, setType] = useState('')

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    console.log("in useEffect");
    fetch("/snack/")
      .then((res) => res.json())
      .then((data) => setBoxArray(data));
  }, []);

  const filterBoxes = (queryArray) => {
    const searchQuery = document.getElementById("searchId").value;
    //check if queryArray
    //if it is then use the searchQuery input field otherwise use the normal array (filter option)
    if (queryArray.type === 'click') {
      queryArray = searchQuery.toLowerCase().split(' ')
    }
    console.log('query array ', queryArray)
    let filteredBoxes = [];
    console.log('box array', boxArray)
    if (queryArray.length === 0 || queryArray[0] === "") {
      filteredBoxes = boxArray;
    }
    else if ((queryArray[0] === "Top" || queryArray[0] === "Least") && queryArray.length === 1) {
      filteredBoxes = boxArray;
    }
    else {
      boxArray.forEach(el => {
        let stringOfPossibles = `${el.snack_name} ${el.brand_name} ${el.origin} ${el.type} ${el.flavor_profile}`;
        let arrayOfPossibles = stringOfPossibles.toLocaleLowerCase().split(' ');
        let pass = false;
        for (let i = 0; i < queryArray.length; i += 1) {
          if (arrayOfPossibles.includes(queryArray[i])) {
            pass = true
          }
        }
        pass === true ? filteredBoxes.push(el) : null;
      })
    }
    console.log('before sort ', filteredBoxes)
    //query array has more than one argument to be filtered
    if (queryArray.includes('Top')) {
      filteredBoxes.sort((a, b) => b.rating - a.rating)
    }
    if (queryArray.includes('Least')) {
      filteredBoxes.sort((a, b) => a.rating - b.rating)
    }

    // console.log('after sort ',filteredBoxes)

    setFilter(true)
    setBoxArray(filteredBoxes)
  };

  const clearFilters = () => {
    setFilter(false)
    document.getElementById('searchId').value = '';
    console.log('clear filters')
    fetch("/snack/")
      .then((res) => res.json())
      .then((data) => setBoxArray(data))
      .catch(err => console.log('error in clear filters', err))
  }

  let filterOrClear = <button className="searchButton" onClick={filterBoxes}>Search</button>
  if (filter) filterOrClear = <button className="searchButton" onClick={clearFilters}>Clear Filters</button>
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
  const handleClick = (e) => {
    e.preventDefault();
    let array = []
    const elements = document.getElementById('filterForm').children;
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].checked) {
        array.push(elements[i].defaultValue)
      }
    }
    array.push(type)
    console.log('array of checked?', array)
    setFilter(true)
    filterBoxes(array)
    setModalIsOpenToFalse();
  }

  const flavorChange = (event) => {
    setFlavor(event.target.value);
  };

  const typeChange = (event) => {
    setType(event.target.value)
  }
  // console.log(query)
  return (
    <div>
      <div className='SnackBoxContainerLabel'>
        <div className='FilterArea'>
          <div>
            <input id="searchId" className="Search" type="text" placeholder='What do you desire?' />
          </div>
          <div className='FilterButtons'>
            {filterOrClear}
            <button className="searchButton" onClick={setModalIsOpenToTrue}>Filter</button>
          </div>
        </div>
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={setModalIsOpenToFalse}
          appElement={document.getElementById("root")} //this is where the modal gets hung (is in relationto)
        >
          <div className="filterContainer">

            <form className="filterForm" id='filterForm' action="">
              <h3>Filters</h3>
                <input type="checkbox" id="sweet" name="sweet" value="sweet" />
                <label htmlFor="sweet">Sweet</label><br />
                <input type="checkbox" id="salty" name="salty" value="salty" />
                <label htmlFor="salty">Salty</label><br />
                <input type="checkbox" id="sour" name="sour" value="sour" />
                <label htmlFor="sour">Sour</label><br />
                <input type="checkbox" id="spicy" name="spicy" value="spicy" />
                <label htmlFor="spicy">Spicy</label><br />
                <input type="checkbox" id="bitter" name="bitter" value="bitter" />
                <label htmlFor="bitter">Bitter</label><br />


                <input type="checkbox" id="chips" name="chips" value="chips" />
                <label htmlFor="chips">Chips</label><br />
                <input type="checkbox" id="candy" name="candy" value="candy" />
                <label htmlFor="candy">Candy</label><br />
                <input type="checkbox" id="beverage" name="beverage" value="beverage" />
                <label htmlFor="beverage">Beverage</label><br />
                <input type="checkbox" id="fruit" name="fruit" value="fruit" />
                <label htmlFor="fruit">Fruit</label><br />

              <FormControl className={classes.formControl}>
                <InputLabel id="snackType">Sort Rating By:</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  onChange={typeChange}
                >
                  <MenuItem value={''}></MenuItem>
                  <MenuItem value={'Top'}>Highest</MenuItem>
                  <MenuItem value={'Least'}>Lowest</MenuItem>

                </Select>
              </FormControl>

              {/* <input type="submit" name="submit" onClick={handleClick} value="inputSubmit" /> */}
            </form>
            <button onClick={handleClick} id='filterInputButton' type="submit" value="Submit">Submit Your Filters</button>
          </div>
        </Modal>
        {/* <FilterModal 
                    queryArray={query} 
                    setQueryArray={setQueryArray} 
                    filterBoxes={filterBoxes}
                    /> */}

      </div>
      <div className='SnackBoxContainer'>
        {boxArray && boxArray.map((el) => <SnackBox box={el} setLoginModal={props.setLoginModal} />)}
      </div>
    </div>
  );
}
