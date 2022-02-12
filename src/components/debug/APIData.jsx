import { useState, useEffect } from "react"
import { getAPIData } from "../../API"
import RawResponseBox from "./RawResponseBox"

const APIData = () => {
    const [response, setResponse] = useState()
    const [serverError, setServerError] = useState();
    useEffect(() => {
        setServerError(null);
        console.log(response)
    }, [response]);

    return <div className="APIData">
        <button onClick={() => { getAPIData(setResponse, setServerError) }}>API Data</button>
        <br />
        <div dangerouslySetInnerHTML={{__html: response}}/>
        <br /> <br />
        <RawResponseBox response={serverError? serverError : response} />
    </div>
}

export default APIData