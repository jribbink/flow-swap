// @ts-ignore
import * as fcl from "@onflow/fcl"
import config from "config"
import { SwapPair } from "models/swap-pair"
import { Token } from "models/token"
import { useEffect, useState } from "react"
import swr, {mutate} from "swr"

export const KEY = '/get-all-balances'

/**
 * 
 * @param token Token object, SwapPair object, token ticker, or SwapPair contract name
 * @param addr Address of user whose balance is to be queried
 * @returns 
 */
export function useAllBalances(addr: any): {
        tokens: {
            token: Token,
            balance: number
        }[],
        pairs: {
            pair: SwapPair,
            balance: number
        }[]
    } {
    const address = fcl.withPrefix(addr)

    useEffect(() => {
        mutate(KEY)
    }, [addr])

    const {data, error} = swr(KEY, async () => {
        if (!address) return null

        const tokens = config.tokens
        const pairs = config.pairs

        console.log("REquesting")

        const cadence = `
            import FungibleToken from 0xFungibleToken
            ${
                tokens.map(token => `import ${token.name} from ${token.address}`).join("\n")
            }
            ${
                pairs.map(pair => `import ${pair.name} from ${pair.address}`)
            }

            pub fun main(addr: Address): [UFix64] {
                let account = getAccount(addr)

                ${
                    tokens.map((token, i) => `
                        let tokenRef${i} = account.getCapability(${token.balancePath}).borrow<&${token.name}.Vault{FungibleToken.Balance}>()
                        let tokenBalance${i} = tokenRef${i} == nil ? 0.0 : tokenRef${i}!.balance
                    `).join("\n")
                }

                ${
                    pairs.map((pair, i) => `
                        let swapPairRef${i} = account.getCapability(${pair.name}.TokenPublicBalancePath).borrow<&${pair.name}.Vault{FungibleToken.Balance}>()
                        let swapPairBalance${i} = swapPairRef${i} == nil ? 0.0 : swapPairRef${i}!.balance
                    `).join("\n")
                }

                return [${
                    [
                        ...tokens.map((token, i) => `tokenBalance${i}`),
                        ...pairs.map((pair, i) => `swapPairBalance${i}`)
                    ].join(", ")
                }]
            }
        `

        const balances: string[] = await fcl.query({
            args: (arg: any, t: any) => [arg(address, t.Address)],
            cadence,
        })

        const tokenBalances = balances.slice(0, tokens.length)
        const pairBalances = balances.slice(tokens.length)

        return {
            tokens: tokenBalances.map((val, i) => ({
                token: tokens[i],
                balance: parseFloat(val)
            })),
            pairs: pairBalances.map((val, i) => ({
                pair: pairs[i],
                balance: parseFloat(val)
            }))
        }
    })

    const balances = data ?? {tokens: [], pairs: []}
    return balances
}
