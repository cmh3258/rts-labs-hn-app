import React from "react";
import './App.css';
import { Navigation } from './App';
import { useSelector } from 'react-redux';
import { historyList } from './historySlice';

const History = () => {
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

export default History;
