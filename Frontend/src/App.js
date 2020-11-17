import logo from './logo.svg';
import './App.css';

const express = require('express');

const app = express();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
