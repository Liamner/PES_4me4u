import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import GeneralStats from './components/generalStats';
import Reports from './controllers/showReports';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{marginLeft: '10%'}}>
        <Router>
          <Routes>
            <Route path="/" element={<GeneralStats />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/category" element={<Reports />} />
          </Routes>
        </Router>
        </div>
    </div>
  );
}

export default App;
