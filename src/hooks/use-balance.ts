// @ts-ignore
import * as fcl from "@onflow/fcl"
import config from "config"
import { Token } from "models/token"
import { useEffect, useState } from "react"
import swr, {mutate} from "swr"

const KEY = '/balances'

/**
 * 
 * @param token Token object or token ticker
 * @param addr Address of user whose balance is to be queried
 * @returns 
 */
export function useBalance(token: Token | string, addr: any): number{
    const address = fcl.withPrefix(addr)

    useEffect(() => {
        mutate(KEY)
    }, [addr])

    const {data, error} = swr(KEY, async () => {
        if (!address) return []
        await new Promise(r => setTimeout(r, 1))

        const tokens = config.tokens

        const cadence = `
            import FungibleToken from 0xFungibleToken
            ${
                tokens.map(token => `import ${token.name} from ${token.address}`).join("\n")
            }

            pub fun main(addr: Address): [UFix64] {
                let account = getAccount(addr)

                ${
                    tokens.map((token, i) => `
                        let tokenRef${i} = account.getCapability(${token.balancePath}).borrow<&${token.name}.Vault{FungibleToken.Balance}>()
                        let tokenBalance${i} = tokenRef${i} == nil ? 0.0 : tokenRef${i}!.balance
                    `).join("\n")
                }

                return [${
                    tokens.map((token, i) => `tokenBalance${i}`).join(", ")
                }]
            }
        `

        const balanceArray: number[] = await fcl.query({
            args: (arg: any, t: any) => [arg(address, t.Address)],
            cadence,
        })

        return balanceArray.map((val, i) => ({
            token: tokens[i],
            balance: val
        }))
    })
    
    return (data ?? []).find(b => {
        if (typeof token == "string") {
            return b.token.ticker == token
        } else {
            return b.token.ticker == token?.ticker
        }
    })?.balance ?? 0
}
