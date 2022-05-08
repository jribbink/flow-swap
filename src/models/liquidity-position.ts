import { SwapPair } from "./swap-pair"
import { Token } from "./token"

export interface LiquidityPosition {
    pair: SwapPair
    tokenAmount: number
    share: number
    poolA: number
    poolB: number
}