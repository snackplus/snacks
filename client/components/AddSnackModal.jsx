import React, { useState } from 'react'
import LoginModal from './LoginModal.jsx'
import Modal from 'react-modal';
import { useLoggedInContext } from './SnackContext.jsx'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


//needs to be changed to redirect to login modal if user is not logged in.
//if they are logged in works as it does currently

export default function AddSnackModal () {
  const isLoggedIn = useLoggedInContext()
  const [snackModalIsOpen, setSnackModalIsOpen] = useState(false);
  const [value, setValue] = React.useState(2);

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#FFFAF1'
    }
  };

  const setModalIsOpenToTrue = () => {
    setSnackModalIsOpen(true)
  }
 
  const setModalIsOpenToFalse =()=>{
    setSnackModalIsOpen(false)
  }

  return (
    <>
     <button onClick={setModalIsOpenToTrue}>Add Snack</button>
     <Modal style={customStyles}
        isOpen={snackModalIsOpen}
        onRequestClose={setModalIsOpenToFalse}
        appElement={document.getElementById('root')} //this is where the modal gets hung (is in relationto)
        >
        <div className="addSnackContainer">
          <button onClick={setModalIsOpenToFalse}>x</button>
          <input className='snackName' placeholder='Snack Name' />
          <input className='snackImage' placeholder='Snack Image png/jpeg' />
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Controlled</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </Box>
          <input className='writtenReview' placeholder='Review' />
          <input className='country' placeholder='Country of Origin' />
          <button onClick={()=>handleSubmission()}>Submit New Snack!</button>
        </div>
      
     </Modal>
   </>


  )
}