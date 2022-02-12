import { useState, useEffect } from "react"
import { getUsers } from "../../API"
import RawResponseBox from "./RawResponseBox"

const GetUsers = () => {
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);
    const responseObject = response ? JSON.parse(response) : {}
    const tables = response ? responseObject.map(user => 
    <table key={user.uid}>
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
    </table>) : null

    return <div className="GetUsers">
        <button onClick={() => { getUsers(setResponse, setServerError) }}>Get Accounts</button>
        <br />
        {tables}
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default GetUsers