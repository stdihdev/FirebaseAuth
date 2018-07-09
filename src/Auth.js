import React, { Component } from 'react';
const firebase = require('firebase');

// Initialize Firebase
  let config = {
    apiKey: "AIzaSyDrFCs8FeprCa7rQoOg_9vEuvkJIB8vUZc",
    authDomain: "authentication-f0e56.firebaseapp.com",
    databaseURL: "https://authentication-f0e56.firebaseio.com",
    projectId: "authentication-f0e56",
    storageBucket: "authentication-f0e56.appspot.com",
    messagingSenderId: "262039274862"
  };
  firebase.initializeApp(config);

export default class Auth extends Component{
  constructor(props){
    super(props);
    this.state = {error: ''};
    this.logIn = this.logIn.bind(this);
  }
  logIn(){
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let loginStatus = firebase.auth().signInWithEmailAndPassword(email, password);

    loginStatus.catch((err) => {
      this.setState({error: err.message});
    });
  }
  render(){
    return (
      <div>
        <p>{this.state.error}</p>
        <input id="email" ref="email" type="email" placeholder="Email" />
          <br />
        <input id="password" ref="password" type="password" placeholder="Password" />
          <br />
          <button onClick={this.logIn} type="button">LogIn</button>
          <button type="button">SignUp</button>
          <button type="button">LogOut</button>
        </div>
  );
  }
}
