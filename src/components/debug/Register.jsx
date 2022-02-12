import { useState, useEffect } from "react"
import { register } from "../../API"
import Registration from "../../DataClasses/Registration"
import RawResponseBox from "./RawResponseBox"

const Register = () => {
    const [registration, setRegistration] = useState(new Registration())
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);

    return <div className="Register">
        <label>
            Username
            <input type="text"
                value={registration.username}
                onChange={e => { setRegistration({ ...registration, username: e.target.value }) }} />
        </label>
        <br />
        <label>
            Password
            <input type="text"
                value={registration.password}
                onChange={e => { setRegistration({ ...registration, password: e.target.value }) }} />
        </label>
        <br />
        <label>
            First Name
            <input type="text"
                value={registration.firstName}
                onChange={e => { setRegistration({ ...registration, firstName: e.target.value }) }} />
        </label>
        <br />
        <label>
            Last Name
            <input type="text"
                value={registration.lastName}
                onChange={e => { setRegistration({ ...registration, lastName: e.target.value }) }} />
        </label>
        <br />
        <label>
            Email
            <input type="text"
                value={registration.email}
                onChange={e => { setRegistration({ ...registration, email: e.target.value }) }} />
        </label>
        <br />
        <label>
            Birth Date
            <input type="text"
                value={registration.dob}
                onChange={e => { setRegistration({ ...registration, dob: e.target.value }) }} />
        </label>
        <br />
        <button onClick={() => register(registration, setResponse, setServerError)}>Register</button>
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default Register