import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function TopBar() {
  return (
    <div className="home-top-bar">
      <AppBar position="static" className="app-header"> 
        <Toolbar variant="dense"/>
      </AppBar>
    </div>
  );
};

