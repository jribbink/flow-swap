// @ts-ignore
import * as fcl from '@onflow/fcl';
import { Transaction } from 'models/transaction';
import { mutate } from 'swr';
import { TransactionStatusCode } from 'ts/enums/transaction-status-code';
import { createContext, ReactNode, useEffect } from 'react';
import useStateCallback from 'hooks/use-state-callback';
import { KEY } from 'hooks/use-all-balances';

const noop = () => {};

type TransactionsContextValue = [
  transactions: Transaction[],
  executeTransaction: (transactionFunction: TransactionFunction) => void,
  clearTransactions: () => void
];

export const TransactionsContext = createContext<TransactionsContextValue>([
  [],
  noop,
  noop
]);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useStateCallback<Transaction[]>(
    typeof window !== 'undefined'
      ? (
          JSON.parse(window.sessionStorage.getItem('transactions') ?? 'null') ??
          []
        ).map((tx: Partial<Transaction>) => new Transaction(tx))
      : []
  );

  useEffect(() => {
    console.log(
      JSON.stringify(transactions),
      transactions.at(transactions.length - 1)?.status
    );
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.sessionStorage.setItem(
          'transactions',
          JSON.stringify(transactions)
        );
      }, 0);
    }
  }, [transactions]);

  const executeTransaction = (transactionFunction: TransactionFunction) => {
    transactionFunction().then(({ id, description }) => {
      const transaction = new Transaction({
        id,
        description,
        status: TransactionStatusCode.PENDING
      });

      setTransactions(
        [transaction, ...transactions],
        (transactions: Transaction[]) => {
          fcl.tx(id).subscribe((status: TransactionStatus) => {
            setTransactions(
              transactions.map((tx) => {
                if (tx.id == id) {
                  tx.status = status.status;
                }
                return tx;
              })
            );

            if (status.status == TransactionStatusCode.SEALED) {
              // Update balances by mutating SWR key
              mutate(KEY);
            }
          });
        }
      );
    });
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const value: TransactionsContextValue = [
    transactions,
    executeTransaction,
    clearTransactions
  ];

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};
