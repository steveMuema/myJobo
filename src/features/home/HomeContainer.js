import React from 'react';
import {  Paper, Button, Typography } from '@material-ui/core';
import { Container } from 'react-bootstrap';
// import PropTypes from 'prop-types';

export default function HomeContainer() {
  return (
    <Container fluid className="home-home-container">
      <Paper className="description"  elevation="3">
        <Paper
          elevation="0"
          className='media'/>
        <Typography className="home-text" variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Button variant="contained" color="secondary" href="/users" className="btn-users">
          Show Users
        </Button>
      </Paper>
    </Container>
  );
};

HomeContainer.propTypes = {};
HomeContainer.defaultProps = {};
