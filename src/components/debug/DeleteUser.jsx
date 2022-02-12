import { useState, useEffect } from "react"
import { deleteUser } from "../../API"
import RawResponseBox from "./RawResponseBox"

const DeleteUser = () => {
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);

    return <div className="DeleteUser">
        <button onClick={() => { deleteUser(setResponse, setServerError) }}>Delete User</button>
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default DeleteUser