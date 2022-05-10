import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TransactionsContext } from "contexts/transactions-context"
import { Transaction } from "models/transaction"
import { useContext } from "react"
import { faArrowsSpin, faArrowUpRightFromSquare, faCheckCircle, faSpinner, faSync, faTriangleExclamation, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { TransactionStatusCode } from "ts/enums/transaction-status-code"

export default () => {
    const [transactions,, clearTransactions] = useContext(TransactionsContext)

    console.log(transactions)

    return (
        <div className="d-flex flex-column bg-secondary bg-opacity-25 p-4">
            <div className="d-flex align-items-end mb-3">
                <h5 className="mb-0">
                    Recent Transactions
                </h5>
                <button className="btn btn-link p-0 shadow-none ms-auto text-decoration-none" onClick={clearTransactions}>
                    (Clear all)
                </button>
            </div>
            <div className="d-flex flex-column" style={{gap: '5px'}}>
                { transactions.map(transaction => (
                    <TransactionListItem key={transaction.id} transaction={transaction} />
                ))}
            </div>
        </div>
    )
}

const TransactionListItem = ({transaction}: {transaction: Transaction}) => {
    let iconColor, icon, spin
    switch (transaction.status) {
        case TransactionStatusCode.PENDING:
        case TransactionStatusCode.FINALIZED:
        case TransactionStatusCode.EXECUTED:
            iconColor = "black"
            icon = faSync
            spin = true
            break;
        case TransactionStatusCode.SEALED:
            iconColor = "green"
            icon = faCircleCheck
            spin = false
            break;
        default:
            iconColor = "red"
            icon = faTriangleExclamation
            spin = false
            break;
    }

    return (
        <div className="d-flex flex-row align-items-center">
            <button className="btn btn-link text-decoration-none p-0">
                <span>{ transaction.description }</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </button>
            <span className="ms-auto">
            <FontAwesomeIcon icon={faCircleCheck} color={iconColor} spin={spin} />
            </span>
        </div>
    )
}