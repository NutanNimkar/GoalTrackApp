import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SharedStateProvider } from "./Context/SharedStateContext";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
// import Groups from './pages/Groups';
import GroupsPage from "./pages/Groups Pages/GroupHomePage";
import GroupDBPage from "./pages/Groups Pages/GroupDB/GroupDBPage";
import UserSignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ForgotPassword from "./components/AuthComponents/ForgotPassword";
import ResetPassword from "./components/AuthComponents/ResetPassword";
import { GroupsPageProvider } from "./Context/GroupsPageContext";
import PersonalDB from "./pages/Groups Pages/PersonalDB/PersonalDB";
import { NavigationProvider } from "./Context/NavigationContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <NavigationProvider>
        <SharedStateProvider>
          <GroupsPageProvider>
            <BrowserRouter>
              <div className="pages">
                <Routes>
                  <Route path="/" element={user ? <Home /> : <Login />} />
                  <Route
                    path="/task"
                    element={user ? <TaskDetails /> : <Login />}
                  />
                  <Route
                    path="/groups"
                    element={user ? <GroupsPage /> : <Login />}
                  />
                  <Route
                    path="/signup"
                    element={!user ? <UserSignUp /> : <Navigate to="/" />}
                  />
                  <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                  />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="*" element={<Navigate to="/" />} />{" "}
                  {/* Catch-all route */}
                  <Route
                    path="/groups/:id/groupdb"
                    element={user ? <GroupDBPage /> : <Login />}
                  />
                  <Route
                    path="/groups/:id/personaldb"
                    element={user ? <PersonalDB /> : <Login />}
                  />
                </Routes>
              </div>
            </BrowserRouter>
          </GroupsPageProvider>
        </SharedStateProvider>
      </NavigationProvider>
    </div>
  );
}

export default App;
