type TransactionFunction = (
  ...args: any[]
) => Promise<{ id: string; description: string }>;
type TransactionStatus = {
  blockId: string;
  errorMessage: string;
  events: {
    data: any;
    eventIndex: number;
    transactionId: string;
    transactionIndex: number;
    type: string;
  }[];
  status: TransactionStatusCode;
};
