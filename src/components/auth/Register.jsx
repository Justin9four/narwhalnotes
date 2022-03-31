import {useState, useEffect} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import Registration from "../../DataClasses/Registration";
import {register} from "../../API";
import ErrorAlert from "../ErrorAlert";

const Register = () => {
  const navigate = useNavigate();
  const [registration, setRegistration] = useState(new Registration());
  const [response, setResponse] = useState();
  const [serverError, setServerError] = useState();
  const [user] = useOutletContext();
  useEffect(() => {
    if (response) {
      navigate("/account");
    }
  }, [response, navigate]);
  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);
  return (
    <div>
      <h2>Step this way, just a moment...</h2>
      <ErrorAlert error={serverError} />
      <div className="registerBox grid-container">
        <h3 id="registerMessage">Organize your first Pod</h3>
        <label id="usernameLabel" htmlFor="username" className="registerLabel">
          Username
        </label>
        <input
          autoFocus
          id="username"
          className="registerInput"
          type="text"
          value={registration.username}
          onChange={(e) => {
            setRegistration({...registration, username: e.target.value});
          }}
        />
        <label id="passwordLabel" htmlFor="password" className="registerLabel">
          Password
        </label>
        <input
          id="password"
          className="registerInput"
          type="password"
          value={registration.password}
          onChange={(e) => {
            setRegistration({...registration, password: e.target.value});
          }}
        />
        <label
          id="firstNameLabel"
          htmlFor="firstName"
          className="registerLabel"
        >
          First Name
        </label>
        <input
          id="firstName"
          className="registerInput"
          type="text"
          value={registration.firstName}
          onChange={(e) => {
            setRegistration({...registration, firstName: e.target.value});
          }}
        />
        <label id="lastNameLabel" htmlFor="lastName" className="registerLabel">
          Last Name
        </label>
        <input
          id="lastName"
          className="registerInput"
          type="text"
          value={registration.lastName}
          onChange={(e) => {
            setRegistration({...registration, lastName: e.target.value});
          }}
        />
        <label id="emailLabel" htmlFor="email" className="registerLabel">
          Email Address
        </label>
        <input
          id="email"
          className="registerInput"
          type="text"
          value={registration.email}
          onChange={(e) => {
            setRegistration({...registration, email: e.target.value});
          }}
        />
        <label id="dobLabel" htmlFor="dob" className="registerLabel">
          Birthday
        </label>
        <input
          id="dob"
          className="registerInput"
          type="text"
          value={registration.dob}
          onChange={(e) => {
            setRegistration({...registration, dob: e.target.value});
          }}
        />
        <br />
        <button
          id="registerButton"
          onClick={() => {
            setServerError(null);
            register(registration, setResponse, setServerError);
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
