import { useState, useEffect } from "react"
import { updateUser } from "../../API"
import UpdateUserClass from "../../DataClasses/UpdateUserClass"
import RawResponseBox from "./RawResponseBox"

const UpdateUser = () => {
    const [updateUserObject, setUpdateUserObject] = useState(new UpdateUserClass())
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);

    return <div className="Register">
        <label>
            First Name
            <input type="text"
                value={updateUserObject.firstName}
                onChange={e => { setUpdateUserObject({ ...updateUserObject, firstName: e.target.value }) }} />
        </label>
        <br />
        <label>
            Last Name
            <input type="text"
                value={updateUserObject.lastName}
                onChange={e => { setUpdateUserObject({ ...updateUserObject, lastName: e.target.value }) }} />
        </label>
        <br />
        <label>
            Username
            <input type="text"
                value={updateUserObject.username}
                onChange={e => { setUpdateUserObject({ ...updateUserObject, username: e.target.value }) }} />
        </label>
        <br />
        <label>
            DOB
            <input type="text"
                value={updateUserObject.dob}
                onChange={e => { setUpdateUserObject({ ...updateUserObject, dob: e.target.value }) }} />
        </label>
        <br />
        <label>
            Password
            <input type="text"
                value={updateUserObject.password}
                onChange={e => { setUpdateUserObject({ ...updateUserObject, password: e.target.value }) }} />
        </label>
        <br />
        <label>
            Photo URL
            <input type="text"
                value={updateUserObject.photoURL}
                onChange={e => { setUpdateUserObject({ ...updateUserObject, photoUrl: e.target.value }) }} />
        </label>
        <br />
        <button onClick={() => updateUser(updateUserObject, setResponse, setServerError)}>Update User</button>
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default UpdateUser