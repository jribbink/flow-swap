// @ts-ignore
import * as fcl from '@onflow/fcl'
import { useFlowBalance } from "hooks/use-flow-balance"
import FlowImage from 'assets/flow.png'
import Image from "next/image"
import styles from "styles/header.module.css"
import { MouseEventHandler, useState } from "react"
import AccountInfoModal from './AccountInfoModal'

type UserInfoProps = {
    user: any
}

export default ({user}: UserInfoProps) => {
    const balance = useFlowBalance(user.addr)
    const [showAccountInfo, setShowAccountInfo] = useState(() => false)

    const logout: MouseEventHandler<HTMLAnchorElement> = evt => {
        evt.stopPropagation()
        fcl.unauthenticate()
    }

    return (
        <div>
            <div className={"bg-white p-3 rounded-pill shadow d-flex flex-row align-items-center " + styles['user-menu-balance']}>
                <span className="me-2">{balance}</span>
                <Image src={FlowImage} width="20" height="20" ></Image>
            </div>
            <div className={"dropdown-menu dropstart " + styles['dropdown-menu']}>
                <a className="dropdown-item" onClick={() => setShowAccountInfo(true)}>Account Info</a>
                <a className="dropdown-item" onClick={logout}>Logout</a>
            </div>
            <AccountInfoModal show={showAccountInfo} onShowChange={setShowAccountInfo}></AccountInfoModal>
        </div>
    )
}