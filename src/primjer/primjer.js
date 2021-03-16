import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


const JSX = (
  <div>
    <body id="body"></body>
  </div>
);

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>I am the parent</h1>
        { /* change code below this line */ }



class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name : "Name"
    }

  }
  render() {
    return (
      <div>
        <div>
          <img src=""></img>
        </div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
};