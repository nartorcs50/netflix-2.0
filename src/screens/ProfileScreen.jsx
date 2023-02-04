import React from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import { getAuth, signOut } from "firebase/auth";
import PlansScreen from "../components/PlansScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const auth = getAuth();

  const out = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // alert("signed-out successful");
      })
      .catch((error) => {
        // An error happened.
        const errorCode = error.code;
        alert(errorCode);
      });
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png "
            alt=""
          />

          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlansScreen />

              <button
                onClick={out}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
