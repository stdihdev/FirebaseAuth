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
    this.state = {message: ''};
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  logIn(){
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let loginAttempt = firebase.auth().signInWithEmailAndPassword(email, password);

    loginAttempt
    .then(user => {
      this.setState({message: 'Successfully signed in!'});
      this.refs.logoutBtn.style.display = 'block';
    })
    .catch((error) => {
      this.setState({message: error.message});
    });
  }
  signUp(){
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let signupAttempt = firebase.auth().createUserWithEmailAndPassword(email, password);

    signupAttempt
    .then( user => {
      this.setState({message: 'Welcome ' + user.email});
      firebase.database().ref('users/' + user.uid).set({
        email: user.email
      });
    })
    .catch((error) => {
      this.setState({message: error.message});
    });
  }
  logOut(){
    firebase.auth().signOut();
    this.setState({message: 'Successfully signed out!'});
    this.refs.logoutBtn.style.display = 'none';
  }
  render(){
    return (
      <div>
        <p>{this.state.message}</p>
        <input id="email" ref="email" type="email" placeholder="Email" />
          <br />
        <input id="password" ref="password" type="password" placeholder="Password" />
          <br />
          <button onClick={this.logIn} type="button">LogIn</button>
          <button onClick={this.signUp} type="button">SignUp</button>
          <button onClick={this.logOut} style={{display: 'none'}} ref="logoutBtn" type="button">LogOut</button>
        </div>
  );
  }
}
