export interface PoolAmount {
  [tokenURI: string]: number;
  totalPoolTokens: number;
}
export type PoolAmounts = { [pairName: string]: PoolAmount };
