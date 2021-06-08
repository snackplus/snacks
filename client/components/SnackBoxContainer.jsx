import React from 'react';
import SnackBox from './SnackBox.jsx';


export default function SnackBoxContainer () {
  const boxes = [];
  function makeBoxes () {
    for (let i = 0; i < 6; i += 1){
      boxes.push(<SnackBox />)
    }
  }
  makeBoxes()

  return (
    <div>
      <h3>This is SnackBox Container</h3>
      {boxes}
    </div>
    
  )
}