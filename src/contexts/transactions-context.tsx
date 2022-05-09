// @ts-ignore
import * as fcl from '@onflow/fcl'
import { Transaction } from "models/transaction";
import { mutate } from 'swr';
import { TransactionStatusCode } from 'ts/enums/transaction-status-code';
import { createContext, ReactNode } from "react";
import useStateCallback from 'hooks/use-state-callback';
import { KEY } from 'hooks/use-all-balances';

type TransactionsContextValue = [
    transactions: Transaction[],
    executeTransaction: (transactionFunction: TransactionFunction) => void
]

export const TransactionsContext = createContext<TransactionsContextValue>([
    [], () => {}
])

export const TransactionsProvider = ({children}: {children: ReactNode}) => {
    const [transactions, setTransactions] = useStateCallback<Transaction[]>([])

    const executeTransaction = (transactionFunction: TransactionFunction) => {
        transactionFunction().then(({id, description}) => {
            const transaction = new Transaction({
                id,
                description,
                status: TransactionStatusCode.PENDING
            })
            
            setTransactions([...transactions, transaction], (transactions: Transaction[]) => {
                fcl.tx(id).subscribe((status: TransactionStatus) => {
                    const transaction = transactions.find(tx => tx.id == id)
                    if (transaction) {
                        transaction.status = status.status
                        setTransactions(transactions)

                        if(transaction.status == TransactionStatusCode.SEALED) {
                            // Update balances by mutating SWR key
                            mutate(KEY)
                        }
                    }
                })
            })
        })
    }

    const value: TransactionsContextValue = [
        transactions,
        executeTransaction
    ]

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
}