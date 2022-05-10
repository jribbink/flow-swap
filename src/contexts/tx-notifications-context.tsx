import { Transaction } from "models/transaction"
import { TXNotification } from "models/tx-notification"
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { TransactionsContext } from "./transactions-context"

const PROGRESS_POLLING_INTERVAL_MS = 50

type TXNotificationsValue = [
    notifications: TXNotification[],
    discardNotification: (notification: TXNotification) => void
]

export const TXNotificationsContext = createContext<TXNotificationsValue>([
    [], () => {}
])

export const TXNotificationsProvider = ({children}: {children: ReactNode}) => {
    const [notifications, setNotifications] = useState<TXNotification[]>([])
    const [transactions] = useContext(TransactionsContext)
    const lastTransactions = useRef<Transaction[]>(transactions)

    useEffect(() => {
        const newTransactions = transactions.filter(tx => !lastTransactions.current.find(lastTx => lastTx.id == tx.id))
        const newNotifications = newTransactions.map<TXNotification>(transaction => {
            let issued = new Date()
            let expiry = new Date()
            expiry.setSeconds(expiry.getSeconds() + 10)

            return {
                transaction,
                issued,
                expiry,
                progress: 0
            }
        })
        setNotifications([...newNotifications, ...notifications])

        lastTransactions.current = transactions
    }, [transactions])

    useEffect(() => {
        (function progressUpdateLoop () {
            setNotifications(notifications => notifications.reduce((newNotifications, notification) => {
                const issued = notification.issued.getTime()
                const expiry = notification.expiry.getTime()
                const now = (new Date()).getTime()
                
                const progress = Math.min((now - issued) / (expiry - issued), 1)
                
                if (progress < 1) {
                    newNotifications.push({
                        ...notification,
                        progress,
                    })
                }
                return newNotifications
            }, [] as TXNotification[]))

            setTimeout(progressUpdateLoop, PROGRESS_POLLING_INTERVAL_MS)
        })()
    }, [])

    const discardNotification = (notification: TXNotification) => {
        setNotifications(notifications.filter(n => n.transaction.id != notification.transaction.id))
    }

    const providerValue: TXNotificationsValue = [
        notifications,
        discardNotification
    ]

    return (
        <TXNotificationsContext.Provider value={providerValue}>
            {children}
        </TXNotificationsContext.Provider>
    )
}