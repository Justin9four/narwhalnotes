import React, {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import Authentication from "../DataClasses/Authentication";
import {authenticate} from "../API";
import ErrorAlert from "./ErrorAlert";

const SignIn = () => {
  const navigate = useNavigate();
  const [authentication, setAuthentication] = useState(new Authentication());
  const [response, setResponse] = useState();
  const [serverError, setServerError] = useState();
  const [user] = useOutletContext();
  useEffect(() => {
    if (response) {
      console.log(response);
      setTimeout(() => navigate("/account"), 2000);
    }
  }, [response, navigate]);
  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);
  const signInEvent = () => {
    setServerError(null);
    authenticate(authentication, setResponse, setServerError);
  };
  const signInOnEnter = (event) => {
    if (event.key === "Enter") {
      signInEvent();
    }
  };

  return (
    <div>
      <h2>Welcome Back!</h2>
      <ErrorAlert error={serverError} />
      <div className="signInBox grid-container">
        <h3 id="signInMessage">Sign in to your Creative Pod</h3>
        <label id="usernameLabel" htmlFor="username" className="signInLabel">
          Username
        </label>
        <input
          autoFocus
          id="username"
          className="signInInput"
          type="text"
          value={authentication.username}
          onChange={(e) => {
            setAuthentication({...authentication, username: e.target.value});
          }}
          onKeyUp={signInOnEnter}
        />
        <label id="passwordLabel" htmlFor="password" className="signInLabel">
          Password
        </label>
        <input
          id="password"
          className="signInInput"
          type="password"
          value={authentication.password}
          onChange={(e) => {
            setAuthentication({...authentication, password: e.target.value});
          }}
          onKeyUp={signInOnEnter}
        />
        <br />
        <button id="signInButton" onClick={signInEvent}>
          Sign In
        </button>
        <p id="guestMessage">
          <a href="/register">Register</a> for a new account, or{" "}
          <a href="/publicPods">experience</a> ChandlerPod as a guest.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
