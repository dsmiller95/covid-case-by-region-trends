import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './bar-chart/bar-chart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BarChart></BarChart>
      </header>
    </div>
  );
}

export default App;
