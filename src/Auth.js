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
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.signOut = this.signOut.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }
  signIn(){
    let email = this.refs.email.value;
    let password = this.refs.password.value;
    let signinAttempt = firebase.auth().signInWithEmailAndPassword(email, password);

    signinAttempt
    .then(user => {
      this.setState({message: 'Successfully signed in!'});
      this.refs.signoutBtn.style.display = 'block';
      this.refs.signinBtn.style.display = 'none';
      this.refs.signupBtn.style.display = 'none';
      this.refs.signinWithGoogleBtn.style.display = 'none';
    })
    .catch((error) => {
      this.setState({message: error.message});
    });
  }
  googleSignIn(){
    let provider = new firebase.auth.GoogleAuthProvider();
    let googleSignInAttempt = firebase.auth().signInWithPopup(provider);

    googleSignInAttempt
    .then(result => {
      firebase.database().ref('users/'+result.user.uid).set({
        email: result.user.email,
        name: result.user.displayName
      });
      this.setState({message: 'Successfully signed in with Google account'});
      this.refs.signoutBtn.style.display = 'block';
      this.refs.signinBtn.style.display = 'none';
      this.refs.signupBtn.style.display = 'none';
      this.refs.signinWithGoogleBtn.style.display = 'none';
    })
    .catch(error => {
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
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
    })
    .catch((error) => {
      this.setState({message: error.message});
    });
  }
  signOut(){
    let signOutAttempt = firebase.auth().signOut();

    signOutAttempt
    .then( () => {this.setState({message: 'Successfully signed out!'});
    this.refs.signoutBtn.style.display = 'none';
    this.refs.signinBtn.style.display = 'block';
    this.refs.signupBtn.style.display = 'block';
    this.refs.signinWithGoogleBtn.style.display = 'block';
  })
  .catch(error => {
    this.setState({message: error.message});
  });

  }
  render(){
    return (
      <div>
        <p>{this.state.message}</p>
        <input id="email" ref="email" type="email" placeholder="Email" />
          <br />
        <input id="password" ref="password" type="password" placeholder="Password" />
          <br />
          <button onClick={this.signIn} ref="signinBtn" type="button">Sign In</button>
          <button onClick={this.signUp} ref="signupBtn" type="button">Sign Up</button>
          <button onClick={this.signOut} style={{display: 'none'}} ref="signoutBtn" type="button">Sign Out</button>
          <button onClick={this.googleSignIn} ref="signinWithGoogleBtn" type="button">Sign In with Google</button>
        </div>
  );
  }
}
