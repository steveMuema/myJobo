import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {TextField, Typography} from '@material-ui/core';
import axios from 'axios';

function reloadPage(){
  window.location='/users';
}
async function editProfile(id, data) {
  const url = `https://ti-react-test.herokuapp.com/users/${id}`;
  console.log(url);
  const options = {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    data: data,
    url:url
  }
  await axios(options);
  reloadPage();
}
export default function EditModal(props) {
  const key = props.label;
  const [value, setValue] = useState('');
  
  const data = () => {
    let obj = {};
    obj[key] = value;
    let user = JSON.stringify({user:obj});
    console.log(user);

    return user;
  }

 
  return (
    <Modal 
      {...props}
      size='sm'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Typography variant="h5">  Enter new {props.label}: </Typography>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form noValidate autoComplete="off" >

          <div className='modal-form'>
          <TextField
            id="standard-multiline-flexible"
            multiline
            rowsMax="6"
            variant='outlined'
            value={value}
            onChange={(e)=> setValue(e.target.value)}
            >
          </TextField>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={()=> {editProfile(props.userid, data())}}>Update</Button>

      </Modal.Footer>
    </Modal>
  );
};

// function useFormValue(initialValue) {

// }
EditModal.propTypes = {};
EditModal.defaultProps = {};
