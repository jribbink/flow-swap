import { Transaction } from "./transaction"

export interface TXNotification {
    transaction: Transaction
    issued: Date
    expiry: Date
    progress: number
}