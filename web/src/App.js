import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar'
import Login from './components/login'
import GeneralStats from './components/generalStats';
import Reports from './controllers/showReports';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  window.location.reload();
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return JSON.parse(tokenString)
}

function App() {
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken}/>
  }
  return (
    <div className="App">
      <Navbar />
      <div style={{marginLeft: '10%'}}>
        <Router>
          <Routes>
            <Route path="/" element={<GeneralStats />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Router>
        </div>
    </div>
  );
}

export default App;