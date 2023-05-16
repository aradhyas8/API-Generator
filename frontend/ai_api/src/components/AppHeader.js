import React from 'react';
import './AppHeader.css';

const AppHeader = ({ loggedIn, onLogout }) => {
  return (
    <header className="app-header">
      <h1 className="app-title">AI-powered API Generator</h1>
      {loggedIn && (
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default AppHeader;
