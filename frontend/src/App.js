import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { SharedStateProvider } from './Context/SharedStateContext';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import Groups from './pages/Groups';
import UserSignUp from './pages/SignUp';
import Login from './pages/Login';
import { AuthContextProvider } from './Context/AuthContext';
// import Friends from './pages/Friends';


function App() {
  const { user } = useAuthContext()
 

  return (
    <div className="App">
     
      <SharedStateProvider>
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element= {user ? <Home /> : <Navigate to ="/login"/>} />
          <Route path="/task" element={user ? <TaskDetails /> : <Navigate to ="/login"/>} />
          <Route path='/groups' element={user ? <Groups /> : <Navigate to ="/login"/>} />
          <Route path="/signup" element={!user ? <UserSignUp/> : <Navigate to="/" />} />
          <Route path="/login" element={ !user ? <Login/> : <Navigate to="/" />} />
          {/* <Route path="/friends" element={<Friends/>} /> */}
        </Routes>
      </div>
      </BrowserRouter>
      </SharedStateProvider>
    
    </div>
  );
}

export default App;
