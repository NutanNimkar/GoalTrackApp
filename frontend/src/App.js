import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import Groups from './pages/Groups';
import { SharedStateProvider } from './Context/SharedStateContext';

function App() {
  return (
    <div className="App">
      <SharedStateProvider>
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskDetails />} />
          <Route path='/groups' element={<Groups />} />
        </Routes>
      </div>
      </BrowserRouter>
      </SharedStateProvider>
    </div>
  );
}

export default App;
