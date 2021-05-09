import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:''
  })
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    // firebase.auth().signInWithPopup(provider)
    // .then(res => {
    //   const {displayName,photoURL,email} = res.user;
    //     const singedInUser = {
    //       isSignedIn:true,
    //       name:displayName,
    //       email:email,
    //       photo:photoURL
    //     }
    //     setUser(singedInUser);
    //     console.log(displayName);
    // })
    // .catch(error => {
    //   console.log(error)
    //   console.log(error.message)
    //   console.log(error.credential)
    // })
    firebase.auth().signInWithPopup(googleProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  }
  return (
    <div className="App">
        <button onClick={handleSignIn}>Sign in</button>
        {
          user.isSignedIn && <p>Welcome, {user.name} </p>
        }
    </div>
  );
}

export default App;
