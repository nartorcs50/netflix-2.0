import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import app from "../Firebase";
function SingUpScreen() {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert("succesful / account");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
        // ..
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // alert("user Signed in");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
      });
  };

  return (
    <div className="signUpScreen">
      <form>
        <h1>Sign in</h1>
        <input
          type={"email"}
          placeholder="Email or phone number"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"password"}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={signIn}>
          Sign in
        </button>
        <h4>
          <span className="signUpScreen__gray"> New to Netflix? </span>
          <span className="signUpScreen__link" onClick={register}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SingUpScreen;
