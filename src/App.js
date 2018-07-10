import React, { Component } from 'react';
import './App.css';
import Auth from './Auth';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Firebase Auth</h1>
        <Auth />
      </div>
    );
  }
}

export default App;
