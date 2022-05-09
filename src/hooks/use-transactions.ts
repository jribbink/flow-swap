// @ts-ignore
import * as fcl from '@onflow/fcl'
import { Transaction } from "models/transaction";
import { TransactionStatusCode } from 'ts/enums/transaction-status-code';
import useStateCallback from './use-state-callback';

export function useTransactions(): [Transaction[], (transactionFunction: TransactionFunction) => void] {
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
                    }
                })
            })
        })
    }

    return [transactions, executeTransaction]
}