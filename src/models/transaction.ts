export enum TransactionStatus {
    UNKNOWN,
    PENDING,
    FINALIZED,
    EXECUTED,
    SEALED,
    EXPIRED
}

export class Transaction {
    id!: string
    description!: string
    status!: TransactionStatus
    errorMessage?: string

    constructor(data: NonOptional<Transaction>) {
        Object.assign(this, data)
    }
}