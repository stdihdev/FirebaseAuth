import React, { Component } from 'react';
import './App.css';
import Auth from './Auth';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Firebase Auth</h1>
        <p class="info">Check it out on a device with much larger screen size.</p>
        <Auth />
      </div>
    );
  }
}

export default App;
