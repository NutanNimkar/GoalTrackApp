import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import Login from "./pages/Login"
import UserSignUp from "./pages/SignUp"
import Friends from "./pages/Friends.js"
import "./App.css" 


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskDetails />} />
          <Route path="/SignUp" element={<UserSignUp/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/friends" element={<Friends/>} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
