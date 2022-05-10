import { TransactionsContext } from "contexts/transactions-context"
import { useContext } from "react"

export default () => {
    const [transactions, executeTransaction] = useContext(TransactionsContext)

    console.log(transactions)

    return (
        <div className="d-flex flex-column bg-secondary bg-opacity-25 p-4">
            <span>
                Your transactions will appear here...
            </span>
            <div className="d-flex flex-column">
                { transactions.map(transaction => (
                    <div className="d-flex flex-row border bg-light">
                        { transaction.description }
                    </div>
                ))}
            </div>
        </div>
    )
}