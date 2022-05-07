// @ts-ignore
import * as fcl from '@onflow/fcl'
import { useBalance } from "hooks/use-balance"
import FlowImage from 'assets/coins/FLOW.png'
import Image from "next/image"
import styles from "styles/header.module.css"
import { MouseEventHandler, useState } from "react"
import AccountInfoModal from './AccountInfoModal'
import config from 'config'
import useCurrentUser from 'hooks/use-current-user'

type AccountMenuProps = {}

export default ({}: AccountMenuProps) => {
    const user = useCurrentUser()
    const balance = useBalance("FLOW", user.addr)
    const [showAccountInfo, setShowAccountInfo] = useState(() => false)

    const logout: MouseEventHandler = evt => {
        evt.stopPropagation()
        fcl.unauthenticate()
    }

    const shortAddress = (address: string) => {
        return address.substring(0,6) + "..." + address.substring(address.length - 4)
    }

    if (!user.addr) return

    return (
        <div className="d-flex bg-white rounded-4">
            <div className='p-2 pe-1 d-flex flex-column justify-content-center'>
                { balance } FLOW
            </div>
            <button className="btn btn-success shadow-none text-white rounded-4 p-2" onClick={() => setShowAccountInfo(true)}>
                { shortAddress(user.addr) }
            </button>

            <AccountInfoModal show={showAccountInfo} onShowChange={setShowAccountInfo}></AccountInfoModal>
        </div>
    )
}