// @ts-ignore
import * as fcl from "@onflow/fcl"
import config from "config"
import { SwapPair } from "models/swap-pair"
import { Token } from "models/token"
import { useEffect, useState } from "react"
import swr, {mutate} from "swr"
import { useAllBalances } from "./use-all-balances"

/**
 * 
 * @param token Token object, SwapPair object, token ticker, or SwapPair contract name
 * @param addr Address of user whose balance is to be queried
 * @returns 
 */
export function useBalance(token: Token | SwapPair | string | undefined, addr: any): number {
    const balances = useAllBalances(addr)

    if (!token) return 0

    if (!balances) {
        return 0
    } else if (typeof token == "string") {
        return (
            balances!.pairs.find(pair => pair.pair.name == token)?.balance
            ?? balances!.tokens.find(t => t.token.ticker == token)?.balance
            ?? 0
        )
    } else if (token instanceof SwapPair) {
        return balances!.pairs.find(pair => pair.pair.name == token.name)?.balance ?? 0
    } else if (token instanceof Token) {
        return balances!.tokens.find(t => t.token.ticker == token.ticker)?.balance ?? 0
    }
    return 0
}
