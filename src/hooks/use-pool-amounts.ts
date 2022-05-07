// @ts-ignore
import * as fcl from '@onflow/fcl'
import { SwapPair } from "models/swap-pair";
import useSWR from "swr";

const key = (address: string) => {
    return `/check-pool-amounts/${address}`
}

export default (pair: SwapPair, address: string) => {
    const {data, error} = useSWR(key(address), async () => {
        if (!address) return null

        const res = await fcl.query({
            cadence: `
                import ${pair.name} from ${address}

                pub fun main(): [UFix64] {
                    let poolAmounts = ${pair.name}.getPoolAmounts()
                    let totalSupply = ${pair.name}.totalSupply

                    return [poolAmounts.token1Amount, poolAmounts.token2Amount, totalSupply]
                }
            `
        })

        return {
            poolA: res[0],
            poolB: res[1],
            totalSupply: res[3]
        }
    })

    return data
}