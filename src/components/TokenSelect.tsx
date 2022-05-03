import { Token } from "models/token"
import { MouseEventHandler, useEffect, useState } from "react"
import FlowImage from 'assets/flow.png'
import styles from "styles/header.module.css"
import useCurrentUser from "hooks/use-current-user"
import { useFlowBalance } from "hooks/use-flow-balance"
import Image from "next/image"
import SelectTokenModal from "./SelectTokenModal"


type TokenSelectProps = {
    onChange?: (token: Token) => void
    onClick?: MouseEventHandler
    defaultToken?: Token,
    showBalance?: boolean
}

export default ({onChange, onClick, defaultToken, showBalance = false}: TokenSelectProps) => {
    const [token, setToken] = useState(() => defaultToken)
    const [buttonClasses, setButtonClasses] = useState<string>()
    const [showModal, setShowModal] = useState(false)

    const user = useCurrentUser()
    const balance = useFlowBalance(user.addr)

    const getButtonClass = () => {
        let classes = "btn p-2 rounded-pill shadow d-flex flex-row align-items-center "
        classes += styles['user-menu-balance']

        if (token) {
            classes += " bg-white "
        } else {
            classes += " bg-success text-white text-uppercase text-nowrap "
        }

        return classes
    }

    useEffect(() => setButtonClasses(getButtonClass()), [token])

    const buttonClickHandler: MouseEventHandler = e => {
        setShowModal(true)
        e.stopPropagation()
    }

    return (
        <>
            <button onClick={buttonClickHandler} className={buttonClasses}>
                {
                    token ?
                        (<>
                            <Image src={FlowImage} width="50" height="50" ></Image>
                            <span className="ms-2">
                                { showBalance ? balance : token?.ticker }
                            </span>
                        </>)
                    :
                    "Select Token"
                }
            </button>
            <SelectTokenModal show={showModal} onShowChange={setShowModal}></SelectTokenModal>
        </>
    )
}