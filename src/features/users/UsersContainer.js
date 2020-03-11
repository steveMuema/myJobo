import React, {  useState, useEffect } from 'react';
import { useFetchUsersList } from './redux/hooks';
import { Container, Nav, Button } from 'react-bootstrap';
import { Divider, List, ListItem, ListItemText, Collapse, ListItemIcon, Typography, ListItemSecondaryAction, IconButton, Card } from '@material-ui/core';
import { AccountCircle, Edit} from '@material-ui/icons';
import {EditModal} from './';


export default function UsersContainer() {
  const {usersList, fetchUsersList} = useFetchUsersList();
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentEdit, setCurrentEdit] = useState('');

  const handleClick = () => {
    setOpen(!open);
  };
  const handleEdit = (currentUser, currentEdit) => {
    setModalShow(true);
    setCurrentUser(currentUser);
    setCurrentEdit(currentEdit)
    console.log(currentEdit);
  }
  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList] )
  
  return (
    <Container fluid='lg' className='users-container'>
      <Container fluid className='nav'>
      <Nav className='nav'>
          <Typography>{`List of all ${usersList.length} users`}</Typography>
          <Button variant='text' className="btn-info"onClick={handleClick}>{open ? 'HIDE INFO' : 'SHOW INFO'}</Button>
        </Nav>
        </Container>
      {usersList.length>0 ? (
      <Container fluid className='root'>
      <List
        >
          {usersList.map(item=> (
            <div key={item.id} >
                <ListItem key={item.id}  >
                  <ListItemIcon>
                    <AccountCircle/>
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction >
                    <IconButton onClick={()=> handleEdit(item, 'name')} disableRipple>
                      <Edit/>
                    </IconButton>

                  </ListItemSecondaryAction>
                </ListItem>
                <Divider/>
                <Collapse in={open} unmountOnExit >
                  <Card className='user-detail'>
                    <Container fluid className='user-description'>
                      <Typography variant="h5" className='user-title'>Email:</Typography>
                      <Typography variant="body1"> {item.email}</Typography>
                      <Button className="btn-change" onClick={()=> handleEdit(item, 'email')}>Change</Button>
                      <Divider/>
                      <Typography variant="h5" className='user-title'>Bio:</Typography>
                      <Typography variant="body1">{item.bio}</Typography>
                      <Button className="btn-change" onClick={()=> handleEdit(item, 'bio')}>Change</Button>
                    </Container>
                   </Card>
                </Collapse>
                
              </div> 
        ))}
        <EditModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          userid={currentUser.id}
          label={currentEdit}
        />
      </List>
      </Container>
      ): (
        <Typography variant='body1'> Fetching users...</Typography>
      )}
    </Container>
  );
};

UsersContainer.propTypes = {};
UsersContainer.defaultProps = {};
