import React, { useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ApiForm from './components/ApiForm';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Perform login request and handle response
    // If successful, setLoggedIn(true)
    console.log('Logging in with', email, password);
    setLoggedIn(true);
  };

  const handleRegister = (email, password) => {
    // Perform registration request and handle response
    // If successful, setLoggedIn(true)
    console.log('Registering with', email, password);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout request and handle response
    // If successful, setLoggedIn(false)
    console.log('Logging out');
    setLoggedIn(false);
  };

  const handleCreateApi = (apiName, apiDescription) => {
    // Perform API creation request and handle response
    // Display created API or an error message
    console.log('Creating API with', apiName, apiDescription);
  };

  return (

        <ApiForm onCreateApi={handleCreateApi} />
  );
};

export default App;
