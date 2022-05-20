import { TransactionStatusCode } from 'ts/enums/transaction-status-code';

export class Transaction {
  id!: string;
  description!: string;
  status!: TransactionStatusCode;
  errorMessage?: string;

  constructor(data: NonOptional<Transaction>) {
    Object.assign(this, data);
  }
}
