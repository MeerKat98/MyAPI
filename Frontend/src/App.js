import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  getReq() {
    console.log("Requesting data from API")
    fetch('https://api-middle-man.herokuapp.com/emp')
    .then( result => {
      return result.json();
    })
    .then(data => {
      console.log(data);
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Login</h3>
        </header>
        <div className="content-container">
          <div className="btn" onClick={this.getReq}>Get</div> 
        </div>
      </div>
    );
  }
}

export default App;
