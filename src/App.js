import React, { useState }from "react";
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateList, historyList } from './historySlice'

function Main() {
  return (
    <>
      <Outlet />
    </>
  );
}

function Navigation() {
  return (
    <nav>
      <NavLink to="/search" activeclassname="active">Search</NavLink>
      <NavLink to="/history" activeclassname="active">History</NavLink>
    </nav>
  );
}

function Search() {
  /*
  * "/search" lets the user search the Hacker News Algolia API 
  * and displays a list of results
  */
  const dispatch = useDispatch();
  const [searchVal, setSearchVal] = useState();
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const formatDate = (isoStr) => {
    return new Date(isoStr).toLocaleDateString('en-US');
  }

  const formatResults = (results) => {
    const formatResults = results.map((elem, i) => {
      return (
        <div className="result-container" key={i}>
          <h3>{i}. {elem.title}</h3>
          <p>Author: {elem.author}</p>
          <p>{formatDate(elem.created_at)}</p>
        </div>
      )
    });
    setResults(formatResults);
  }

  const searchHN = (input) => {
    dispatch(updateList(input));
    fetch('https://hn.algolia.com/api/v1/search?query='+input)
      .then((response) => response.json())
      .then((data) => {
          formatResults(data.hits)
          setError();
        })
      .catch((error) => {setError(error)});
  }

  return (
    <>
    <Navigation />
    <input placeholder="Place search text here..." onChange={(e) => setSearchVal(e.target.value)}></input>
    <button onClick={() => searchHN(searchVal)}>Search</button>
    <div className="results">{error ? "Error" : results}</div>
    </>
  );
}

function History() {
  /* 
   * "/history" shows the users a list of their past searches 
   * from this session (these do not need to persist through refresh).
   */
  const searchHistory = useSelector((state) => state.history.value);
  const historyList = searchHistory.map((val, key) => <li key={key}>{val}</li>);
  return (
    <>
    <Navigation />
    <h3>History of your searches...</h3>
    {historyList.length === 0 ? 'No Results' : historyList}
    </>
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
