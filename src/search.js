import React, { useState }from "react";
import { Navigation } from './App';
import { useDispatch } from 'react-redux';
import { updateList } from './historySlice';

const Search = () => {
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

export default Search;