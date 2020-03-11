import React from 'react';
import TopBar from '../home/TopBar';
import { UsersContainer } from './';
// import PropTypes from 'prop-types';

export default function Layout() {
  return (
    <div className="users-layout">
      <TopBar/>
      <UsersContainer/>
    </div>
  );
};

Layout.propTypes = {};
Layout.defaultProps = {};
