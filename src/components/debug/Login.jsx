import { useState, useEffect } from "react"
import Authentication from "../../DataClasses/Authentication"
import { authenticate } from "../../API"
import RawResponseBox from "./RawResponseBox"

const Login = () => {
    const [authentication, setAuthentication] = useState(new Authentication())
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);

    return <div className="Login">
        <label>
            Username
            <input type="text"
                value={authentication.username}
                onChange={e => { setAuthentication({ ...authentication, username: e.target.value }) }} />
        </label>
        <br />
        <label>
            Password
            <input type="text"
                value={authentication.password}
                onChange={e => { setAuthentication({ ...authentication, password: e.target.value }) }} />
        </label>
        <br />
        <button onClick={() => {
            authenticate(authentication, setResponse, setServerError)
        }}>Login</button>
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default Login