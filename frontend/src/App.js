import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
