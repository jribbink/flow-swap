import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TransactionsContext } from "contexts/transactions-context"
import { Transaction } from "models/transaction"
import { useContext } from "react"
import { faArrowsSpin, faArrowUpRightFromSquare, faCheckCircle, faSpinner, faSync, faTriangleExclamation, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { TransactionStatusCode } from "ts/enums/transaction-status-code"
import { generateFlowscanURL } from "util/util"

export default () => {
    const [transactions,, clearTransactions] = useContext(TransactionsContext)

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
            {
                transactions.length > 0
                    ? (
                        <div className="d-flex flex-column" style={{gap: '5px'}}>
                            { Object.keys(transactions).reverse().slice(0,5).map((key: any) => (
                                <TransactionListItem key={transactions[key].id} transaction={transactions[key]} />
                            ))}
                        </div>
                    )
                    : (
                        <div>
                            Your recent transactions will appear here...
                        </div>
                    )
            }
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
            <a className="btn btn-link text-decoration-none shadow-none p-0" href={generateFlowscanURL({transactionId: transaction.id})}>
                <span>{ transaction.description }</span>
                <FontAwesomeIcon className="ps-2" icon={faArrowUpRightFromSquare} />
            </a>
            <span className="ms-auto">
            <FontAwesomeIcon icon={icon} color={iconColor} spin={spin} />
            </span>
        </div>
    )
}