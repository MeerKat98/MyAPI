import React from 'react';
import logo from './logo.svg';
import FileUpload from './components/fileUpload';
import './App.css';

const App = () => <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h3 className="header-text">D.C.S.I</h3>
      <img src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="container mt-4">
      <p className="text-center mb-4">Welcome to the data classification and storage interface.</p>
      <FileUpload/>
    </div>
  </div>;

export default App;
