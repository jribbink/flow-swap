// @ts-ignore
import * as fcl from '@onflow/fcl'
import config from 'config';
import { PoolAmounts } from 'models/pool-amount';
import { Token } from 'models/token';
import useSWR from "swr";
import { findPair } from 'util/util';

const KEY = '/check-pool-amounts/'

export default function useAllPoolAmounts(): PoolAmounts {
    const {data, error} = useSWR(KEY, async () => {
        const res = await fcl.query({
            cadence: `
                ${config.pairs.map(pair => `
                    import ${pair.name} from ${pair.address}
                `).join("\n")}

                pub fun main(): [UFix64] {
                    ${config.pairs.map((pair, i) => `
                        let poolAmounts${i} = ${pair.name}.getPoolAmounts()
                        let totalSupply${i} = ${pair.name}.totalSupply
                    `).join("\n")}

                    return [${
                        config.pairs.map((pair, i) => `
                            poolAmounts${i}.token1Amount, poolAmounts${i}.token2Amount, totalSupply${i}
                        `).join(", ")
                    }]
                }
            `
        })

        const poolAmounts: PoolAmounts = {}
        config.pairs.forEach((pair, i) => {
            poolAmounts[pair.name] = {
                poolA: parseFloat(res[i]),
                poolB: parseFloat(res[i + 1]),
                totalSupply: parseFloat(res[i + 2])
            }
        })

        return poolAmounts
    })

    return data!
}