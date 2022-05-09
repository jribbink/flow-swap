type RequiredKeys<T> = {
  [K in keyof T]: ({} extends { [P in K]: T[K] } ? never : K)
}[keyof T];

type NonOptional<T> = Pick<T, RequiredKeys<T>>;

type MyType = {
  thingOne: number,
  thingTwo?: number
};

type TransactionFunction = (...args: any[]) => Promise<{id: string, description: string}>
type TransactionStatus = {
  blockId: string,
  errorMessage: string,
  events: {
    data: any,
    eventIndex: number,
    transactionId: string,
    transactionIndex: number,
    type: string
  }[],
  status: TransactionStatusCode
}