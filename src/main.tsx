// Import stuff
import { D } from "./D";
import { createRoot } from "react-dom/client";
import { Component, FC } from "react";
import { initializeApp } from "firebase/app";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import {
  getAuth,
  connectAuthEmulator,
  GithubAuthProvider,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import "./index.css";
import "./App.css";

const root: any = createRoot(document.querySelector("#root")!);

const firebaseConfig = {
  apiKey: "AIzaSyDKWNZQWf6T3DDCoeKhK5PZCAquzdOQ56o",
  authDomain: "react-210.firebaseapp.com",
  projectId: "react-210",
  storageBucket: "react-210.appspot.com",
  messagingSenderId: "72002503554",
  appId: "1:72002503554:web:10e06b2fc474ead09a859b",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firebase-y stuff
const functions = getFunctions();
const auth = getAuth();

// Initialize emulators
connectFunctionsEmulator(functions, "localhost", 5001);
connectAuthEmulator(auth, "http://localhost:9099");

const provider = new GithubAuthProvider();

// Create a new component for calling to the Cloud Function "callable"
class Functions extends Component {
  // Sign in with GitHub
  async github() {
    try {
      await signInWithPopup(auth, provider);
      console.log("Signed in");
    } catch (error) {
      console.error(error);
    }
  }
  //Sign user out
  async logOut() {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (error) {
      console.error(error);
    }
  }
  // Call the Cloud Function
  callFunction() {
    httpsCallable(functions, "callable")()
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <>
        <button onClick={this.callFunction}>Call the function</button>
        <button onClick={this.github}>Sign in with GitHub</button>
        <button onClick={this.logOut}>Sign out</button>
      </>
    );
  }
}

interface AppI {
  e1: JSX.Element,
  e2: JSX.Element
}

const App: FC<AppI> = (props) => {
  return (
    <>
      {props.e1} <br />
      {props.e2}
    </>
  );
}

root.render(<App e1={<Functions />} e2={<D />} />);
