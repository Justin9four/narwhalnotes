import { useState, useEffect } from "react"
import { getUser } from "../../API"
import RawResponseBox from "./RawResponseBox"

const GetUser = () => {
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);

    const user = response ? JSON.parse(response) : {}
    const table = response? <table>
        <tbody>
            <tr>
                <td>Username</td><td>{user.username}</td>
            </tr>
            <tr>
                <td>Email</td><td>{user.email}</td>
            </tr>
            <tr>
                <td>Photo URL</td><td>{user.photoUrl}</td>
            </tr>
            <tr>
                <td>First Name</td><td>{user.firstName}</td>
            </tr>
            <tr>
                <td>Last Name</td><td>{user.lastName}</td>
            </tr>
            <tr>
                <td>Date of Birth</td><td>{user.dob}</td>
            </tr>
            <tr>
                <td>isAdmin</td><td>{user.roles.includes("ROLE_ADMIN").toString()}</td>
            </tr>
        </tbody>
    </table>: null

    return <div className="GetUser">
        <button onClick={() => { getUser(setResponse, setServerError) }}>Get Account</button>
        <br />
        {table}
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default GetUser