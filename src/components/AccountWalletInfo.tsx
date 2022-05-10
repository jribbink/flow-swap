import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopy } from "@fortawesome/free-solid-svg-icons"
import useCurrentUser from "hooks/use-current-user"
import { MouseEventHandler, useState } from "react"
import { generateFlowscanURL } from "util/util"

export default () => {
    const user = useCurrentUser()
    const [showCopiedText, setShowCopiedText] = useState<boolean>(false)

    const handleCopyButtonClick: MouseEventHandler = () => {

    }

    const handleFlowscanClick: MouseEventHandler = () => {
        window.open(generateFlowscanURL(user.addr), '_blank')!.focus();
    }

    return (
        <div className="d-flex flex-column rounded-4 p-3 bg-light shadow-sm border">
            <div className="d-flex flex-row align-items-center">
                <span>Connected with Blocto</span>
                <button className="btn ms-auto btn-secondary">Change</button>
            </div>
            <div style={{fontSize: '1.5em'}}>
                {user.addr}
            </div>
            <div className="d-flex flex-row mt-1" style={{gap: '10px'}}>
                <button
                    className="d-flex flex-row align-items-center btn p-1 shadow-none"
                    style={{gap: '5px'}}
                    onClick={handleCopyButtonClick}
                >
                    <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                    <span>Copy Address</span>
                </button>
                <button
                    className="d-flex flex-row align-items-center btn p-1 shadow-none"
                    style={{gap: '5px'}}
                    onClick={handleFlowscanClick}
                >
                    <FontAwesomeIcon icon={faCopy}></FontAwesomeIcon>
                    <span>View on Flowscan</span>
                </button>
            </div>
        </div>
    )
}