import { useState } from "react"
import { processAuthToken } from "../../API"

const CheckToken = () => {
    const [authToken, setAuthToken] = useState("")

    return <div className="authAccount">
        <label>
        Auth Token
            <input type="text"
                value={authToken}
                onChange={e => { setAuthToken(e.target.value) }} />
        </label>
        <br />
        <button onClick={() => {
            processAuthToken(authToken)
        }}>Check</button>
        <br />
        <strong>Displayed in Developer Console (option + command + c)</strong>
    </div>
}

export default CheckToken