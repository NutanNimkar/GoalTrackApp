import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskDetails />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
