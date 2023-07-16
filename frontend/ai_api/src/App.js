import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import APIPage from './components/APIPage'
import ProjectCreation from './components/ProjectCreation';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projectCreation" element={<ProjectCreation />} />
      <Route path="/apiPage/:projectId" element={<APIPage />} />
      <Route path="/codeDisplay/:code" element={<CodeDisplay />} />
    </Routes>
  );
};

export default App;
