import React from 'react';
import TopBar from './TopBar';  
import HomeContainer from './HomeContainer';

export default function WelcomePage() {
  return (
    <div className="home-welcome-page">
      <TopBar />
      <HomeContainer />
    </div>
  );
}
