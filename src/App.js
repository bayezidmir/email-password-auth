import logo from "./logo.svg";
import "./App.css";
import app from "./firebase.init";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  // Google sign in
  const googleLoginHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // google sign out
  const googleHandleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };

  return (
    <div className="App">
      <h1>Simple Firebase Auth</h1>
      <img src={user.photoURL} alt="" />
      <p>Name: {user.displayName}</p>
      {user.uid ? (
        <button onClick={googleHandleLogOut}>Google Log Out</button>
      ) : (
        <button onClick={googleLoginHandler}>Google Log In</button>
      )}
    </div>
  );
}

export default App;
