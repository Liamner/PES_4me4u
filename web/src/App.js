import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar'
import Login from './components/login'
import GeneralStats from './components/generalStats';
import Reports from './controllers/showReports';

function App() {
  const [token, setToken] = React.useState();
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