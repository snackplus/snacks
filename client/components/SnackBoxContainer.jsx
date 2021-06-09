import React, { useEffect, useState } from "react";
import SnackBox from "./SnackBox.jsx";
import { useSnackArrayContext, setSnackArrayContext } from "./SnackContext.jsx";
// import fetch from 'isomorphic-fetch'

export default function SnackBoxContainer() {
  const boxArray = useSnackArrayContext();
  const setBoxArray = setSnackArrayContext();

  useEffect(() => {
    console.log("in useEffect");
    fetch("/snack/")
      .then((res) => res.json())
      .then((data) => setBoxArray(data));
  }, []);

  const search = () => {
    const searchQuery = document.getElementById("searchId").value;
    console.log("searching with: ", searchQuery);
    fetch("/snack/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([searchQuery]),
    })
      .then((res) => res.json())
      .then((data) => setBoxArray(data))
      .catch((e) => console.log("Search request failed: ", e));
  };

  const filter = () => {};

  return (
    <div>
      <div className='SnackBoxContainerLabel'>
        <input id="searchId" className="Search" type="text" />
        <button onClick={search}>Search</button>

        <h3>THESE ARE YOUR SNACKS</h3>
      </div>
      <div className='SnackBoxContainer'>
      {boxArray && boxArray.map((el) => <SnackBox box={el} />)}
      </div>
    </div>
  );
}
