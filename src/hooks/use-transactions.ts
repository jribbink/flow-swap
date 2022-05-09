// @ts-ignore
import * as fcl from '@onflow/fcl'
import { Transaction, TransactionStatus } from "models/transaction";
import { useState } from "react";

export function useTransactions(): [Transaction[], (transactionFunction: TransactionFunction) => void] {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const executeTransaction = (transactionFunction: TransactionFunction) => {
        transactionFunction().then(({id, description}) => {
            const transaction = new Transaction({
                id,
                description,
                status: TransactionStatus.PENDING
            })

            fcl.tx(id).subscribe((status: TransactionStatus) => {
                const transaction = transactions.find(tx => tx.id == id)
                if (transaction) {
                    transaction.status = status
                    setTransactions(transactions)
                }
            })
            setTransactions([...transactions, transaction])
        })
    }

    return [transactions, executeTransaction]
}