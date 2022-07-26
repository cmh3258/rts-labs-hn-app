import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";
import Search from './search';
import History from './history';


function Main() {
  return (
    <>
      <Outlet />
    </>
  );
}

export const Navigation = () => {
  return (
    <nav>
      <NavLink to="/search" activeclassname="active">Search</NavLink>
      <NavLink to="/history" activeclassname="active">History</NavLink>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <h1>HN App</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Search />} />
            <Route path="search" element={<Search />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
