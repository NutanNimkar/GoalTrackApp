import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SharedStateProvider } from "./Context/SharedStateContext";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import GroupPage from "./pages/GroupPage";

import GroupsPage from "./pages/GroupHomePage";
import { GroupsPageProvider } from "./Context/GroupsPageContext";
import UserSignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
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
                  exact
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
                <Route path="*" element={<Navigate to="/" />} />{" "}
                {/* Catch-all route */}
                <Route
                  path="/groups/:id"
                  element={user ? <GroupPage /> : <Login />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </GroupsPageProvider>
      </SharedStateProvider>
    </div>
  );
}

export default App;
