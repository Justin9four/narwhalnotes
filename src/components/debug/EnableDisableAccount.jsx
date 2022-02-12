import { useState, useEffect } from "react"
import { enableDisableAccount } from "../../API"
import RawResponseBox from "./RawResponseBox"

const EnableDisableAccount = () => {
    const [uidOfUser, setUidOfUser] = useState("")
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);

    return <div className="enableDisableAccount">
        <label>
            User's ID
            <input type="text"
                value={uidOfUser}
                onChange={e => { setUidOfUser(e.target.value) }} />
        </label>
        <br />
        <button onClick={() => {
            enableDisableAccount({"uid": uidOfUser, "enabled": true}, setResponse, setServerError)
        }}>Enable Account</button>
        <button onClick={() => {
            enableDisableAccount({"uid": uidOfUser, "enabled": false}, setResponse, setServerError)
        }}>Disable Account</button>
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default EnableDisableAccount