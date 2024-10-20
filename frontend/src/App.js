import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SharedStateProvider } from './Context/SharedStateContext';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Friends from './pages/Friends';
import TaskDetails from './pages/TaskDetails';
import Groups from './pages/Groups';
import UserSignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './components/AuthComponents/ForgotPassword';
import ResetPassword from './components/AuthComponents/ResetPassword';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
     
      <SharedStateProvider>
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={user ? <Home /> : <Login />} />
              <Route path="/task" element={user ? <TaskDetails /> : <Login />} />
              <Route path="/groups" element={user ? <Groups /> : <Login />} />
              <Route path="/signup" element={!user ? <UserSignUp /> : <Navigate to="/" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/friends" element={user ? <Friends /> : <Login />} />
              <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all route */}
            </Routes>
          </div>
        </BrowserRouter>
      </SharedStateProvider>
    
    </div>
  );
}

export default App;
