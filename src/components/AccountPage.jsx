import React, {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {signOutUser, deleteUser} from "../API";
import {getAuth, signOut as signOutFirebase} from "firebase/auth";
import ErrorAlert from "./ErrorAlert";

const AccountPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState();
  const [user] = useOutletContext();

  useEffect(() => {
    if (user === null) {
      navigate("/sign-in");
    }
  }, [user, navigate]);
  let birthday = "";
  let age = "";
  if (user && user.dob) {
    const dateArr = user.dob.split("/");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    if (dateArr.length === 3) {
      let dobObject = new Date(dateArr[2], dateArr[0] - 1, dateArr[1]);
      if (months[dobObject.getMonth()]) {
        birthday = `${months[dobObject.getMonth()]} ${dobObject.getDate()}`;
        age = new Date(new Date() - dobObject).getUTCFullYear() - 1970;
      }
    }
  }
  const auth = getAuth();
  const signOut = () => {
    signOutFirebase(auth)
      .then(() => {
        console.log("logout successful");
        signOutUser(() => {
          navigate("/");
        }, setServerError);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const tryDeleteUser = () => {
    const confirmText =
      "Are you sure you would like to delete your account? All personal data will be irretrievable. This action is permanent.";
    if (window.confirm(confirmText) === true) {
      deleteUser(() => {
        navigate("/");
      }, setServerError);
    }
  };

  return (
    <div>
      <h2 id="welcomeMessage">Account</h2>
      <ErrorAlert error={serverError} />
      <div className="accountBox">
        {user ? (
          <>
            <div id="profilePhotoBox">
              <img
                className="profilePhoto"
                src={
                  user.photoUrl && user.photoUrl !== "null"
                    ? user.photoUrl
                    : "/img/wizard.png"
                }
                alt="Profile"
              />
              <div className="profilePhotoBorder" />
              {user.roles.includes("ROLE_ADMIN") ? (
                <div className="adminBadge">Admin</div>
              ) : null}
            </div>
            <div id="accountDetails">
              <p>Username: {user.username}</p>
              <p>
                Full Name: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.email}</p>
              <p>
                Birthday: {birthday} ({age} years)
              </p>
            </div>
            <br />
            <button
              id="updateAccountLinkButton"
              onClick={() => {
                navigate("/update-account");
              }}
            >
              Update Account
            </button>
            <button id="signOutButton" onClick={signOut}>
              Sign Out
            </button>
            <button id="deleteAccountButton" onClick={tryDeleteUser}>
              Delete Account
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AccountPage;
