import React, { Component } from 'react';
const firebase = require('firebase');

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDrFCs8FeprCa7rQoOg_9vEuvkJIB8vUZc",
    authDomain: "authentication-f0e56.firebaseapp.com",
    databaseURL: "https://authentication-f0e56.firebaseio.com",
    projectId: "authentication-f0e56",
    storageBucket: "authentication-f0e56.appspot.com",
    messagingSenderId: "262039274862"
  };
  firebase.initializeApp(config);

export default class Auth extends Component{
  render(){
    return (
      <h1>Authentication</h1>
    );
  }
}
