// @ts-ignore
import * as fcl from '@onflow/fcl'
import { useBalance } from "hooks/use-balance"
import { MouseEventHandler, useState } from "react"
import AccountInfoModal from './AccountInfoModal'
import useCurrentUser from 'hooks/use-current-user'
import Breakpoint from './Breakpoint'
import { useTransactions } from 'hooks/use-transactions'
import { TransactionStatus } from 'models/transaction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from "@fortawesome/free-solid-svg-icons"

type AccountMenuProps = {}

export default ({}: AccountMenuProps) => {
    const user = useCurrentUser()
    const balance = useBalance("FLOW", user.addr)
    const pendingTransactions = useTransactions()[0].filter(tx => tx.status == TransactionStatus.PENDING)
    const [showAccountInfo, setShowAccountInfo] = useState(() => false)

    const shortAddress = (address: string) => {
        return address.substring(0,6) + "..." + address.substring(address.length - 4)
    }

    if (!user.addr) return null

    return (
        <div className="d-flex bg-white rounded-4">
            <Breakpoint show="lg">
                <div className='p-2 pe-1 d-flex flex-column justify-content-center'>
                    { balance } FLOW
                </div>
            </Breakpoint>
            <button className="btn btn-success shadow-none text-white rounded-4 p-2" onClick={() => setShowAccountInfo(true)}>
                {
                    pendingTransactions.length > 0
                        ? <PendingTransactionsDisplay count={pendingTransactions.length} />
                        : <>
                            <Breakpoint show="lg">
                                { shortAddress(user.addr) }
                            </Breakpoint>
                            <Breakpoint hide="lg">
                                { user.addr }
                            </Breakpoint>
                        </>
                }
            </button>

            <AccountInfoModal show={showAccountInfo} onShowChange={setShowAccountInfo}></AccountInfoModal>
        </div>
    )
}

function PendingTransactionsDisplay ({ count }: { count: number }) {
    return (
        <div className="text-uppercase">
            <FontAwesomeIcon icon={faSync} spin></FontAwesomeIcon>
            <span className="ms-2">
                {count} Pending
            </span>
        </div>
    )
}