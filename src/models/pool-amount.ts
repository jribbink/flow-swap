export interface PoolAmount { 
    poolA: number,
    poolB: number,
    totalSupply: number
}
export type PoolAmounts = {[pairName: string]: PoolAmount}