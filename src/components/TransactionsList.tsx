import { TransactionsContext } from "contexts/transactions-context"
import { useContext } from "react"

export default () => {
    const [transactions, executeTransaction] = useContext(TransactionsContext)

    console.log(transactions)

    return (
        <div className="d-flex flex-column">
            { transactions.map(transaction => (
                <div className="d-flex flex-row border">
                    { transaction.description }
                </div>
            ))}
        </div>
    )
}