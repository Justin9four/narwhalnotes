import { useState, useEffect } from "react"
import { promoteDemoteAccount } from "../../API"
import RawResponseBox from "./RawResponseBox"

const PromoteDemoteAccount = () => {
    const [uidOfUser, setUidOfUser] = useState("")
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
    }, [response]);

    return <div className="promoteDemoteAccount">
        <label>
            User's ID
            <input type="text"
                value={uidOfUser}
                onChange={e => { setUidOfUser(e.target.value) }} />
        </label>
        <br />
        <button onClick={() => {
            promoteDemoteAccount({"uid": uidOfUser, "promoted": true}, setResponse, setServerError)
        }}>Promote Account</button>
        <button onClick={() => {
            promoteDemoteAccount({"uid": uidOfUser, "promoted": false}, setResponse, setServerError)
        }}>Demote Account</button>
        <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default PromoteDemoteAccount