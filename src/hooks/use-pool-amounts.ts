// @ts-ignore
import * as fcl from '@onflow/fcl'
import config from 'config';
import { SwapPair } from "models/swap-pair";
import { Token } from 'models/token';
import useSWR from "swr";
import { findPair } from 'util/util';

const key = (address: string, tokenA?: Token, tokenB?: Token) => {
    if (!tokenA || !tokenB) return null
    const sorted = [tokenA.uri, tokenB.uri]
    sorted.sort()
    return `/check-pool-amounts/${address}/${sorted[0]}/${sorted[1]}`
}

export default (address: string, tokenA?: Token, tokenB?: Token) => {
    const pair = findPair(tokenA, tokenB)

    const {data, error} = useSWR(key(address, tokenA, tokenB), async () => {
        if (!address || !pair) return null

        const res = await fcl.query({
            cadence: `
                import ${pair.name} from ${pair.address}

                pub fun main(): [UFix64] {
                    let poolAmounts = ${pair.name}.getPoolAmounts()
                    let totalSupply = ${pair.name}.totalSupply

                    return [poolAmounts.token1Amount, poolAmounts.token2Amount, totalSupply]
                }
            `
        })

        return {
            poolA: parseFloat(res[0]),
            poolB: parseFloat(res[1]),
            totalSupply: parseFloat(res[2])
        }
    })

    return data
}