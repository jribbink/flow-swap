import { Token } from "./token"

export interface LiquidityPosition {
    tokenA: Token
    tokenB: Token
    amount: number
    share: number
    poolA: number
    poolB: number
}