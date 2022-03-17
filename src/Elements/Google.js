import { Nav } from "react-bootstrap";

import { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
function Google(props) {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBSmp53KwUDawupdcHPRJ2_hqsiwVmppBc",
    authDomain: "rick-and-morty-the-game-51643.firebaseapp.com",
    projectId: "rick-and-morty-the-game-51643",
    storageBucket: "rick-and-morty-the-game-51643.appspot.com",
    messagingSenderId: "765912328045",
    appId: "1:765912328045:web:8075b3e5f973de7fb31c64",
  };

  // Initialize Firebase;
  const [checkIfSignedIn, setCheckIfSignedIn] = useState(false);
  const [userName, setUserName] = useState();

  const app = initializeApp(firebaseConfig);

  console.log(app);

  function isUserSignedIn() {
    return !!getAuth().currentUser;
  }

  console.log(checkIfSignedIn);

  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    let provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
    console.log(isUserSignedIn());
    setCheckIfSignedIn(isUserSignedIn());
    setUserName(getAuth().currentUser.displayName);
  }

  const signInOut = () => {
    console.log("pbg");
    if (checkIfSignedIn === true) {
      signOut(getAuth());
      console.log("signoutfail");
      setCheckIfSignedIn(false);
      console.log(checkIfSignedIn);
      console.log(isUserSignedIn());
    } else {
      signIn();
    }
  };

  console.log(userName);

  const userData = {
    userName: userName,
  };

  props.onUserData(userData);

  return (
    <div>
      {checkIfSignedIn ? (
        <Nav.Link onClick={signInOut} href="#action1">
          Welcome {userName} (Sign out)
        </Nav.Link>
      ) : (
        <Nav.Link onClick={signIn} href="#action1">
          Login with google
        </Nav.Link>
      )}
    </div>
  );
}

export default Google;
