import Home from './components/Home'
import APIPage from './components/APIPage'
import Dashboard from './components/Dashboard'
import DocumentationPage from './components/DocumentationPage'
import ErrorPage from './components/ErrorPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Settings from './components/Settings'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
    <Home />
    </BrowserRouter>
  )
}

export default App