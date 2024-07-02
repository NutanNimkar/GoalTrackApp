import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import Groups from './pages/Groups';
import { SharedStateProvider } from './Context/SharedStateContext';
import GroupsPage from './pages/GroupHomePage';
import { GroupsPageProvider } from './Context/GroupsPageContext';

function App() {
  return (
    <div className="App">
      <SharedStateProvider>
      <GroupsPageProvider>
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task" element={<TaskDetails />} />
          <Route path='/groups' element={<GroupsPage />} />
        </Routes>
      </div>
      </BrowserRouter>
      </GroupsPageProvider>
      </SharedStateProvider>
    </div>
  );
}

export default App;
