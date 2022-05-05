// @ts-ignore
import * as fcl from "@onflow/fcl"
import { Token } from "models/token"
import { useEffect, useState } from "react"
import swr, {mutate} from "swr"

const PATH = "/public/flowTokenBalance"
const TICKER = "FLOW"
const FN_NAME = "useFlowBalance"
const ZERO = "0.00000000"

function key(address: any) {
  address = fcl.withPrefix(address)
  return `/${TICKER}/${address}/balance`
}

export function refetch(address: any) {
  mutate(key(address))
}

export function useBalance(token: Token | undefined, address: any) {
    const [balance, setBalance] = useState(0)
    const b = getBalance()

    function getBalance() {
        address = fcl.withPrefix(address)

        const {data, error} = swr(token, async () => {
          if (address == null) return `${ZERO} ${TICKER}`
      
          await new Promise(r => setTimeout(r, 1))
          return fcl
            .query({
              args: (arg: any, t: any) => [arg(address, t.Address)],
              cadence: `
                import FungibleToken from 0xFungibleToken
                pub fun main(addr: Address): UFix64 {
                  let cap = getAccount(addr)
                    .getCapability<&{FungibleToken.Balance}>(${token?.path})
                  if let moneys = cap.borrow() {
                    return moneys.balance
                  } else {
                    return UFix64(0.0)
                  }
                }
              `,
            })
            .catch((error: any) => {
              console.error(`-- ${FN_NAME}(${address}) --`, error)
              return ZERO
            })
            .then((d: any) => `${d} ${TICKER}`)
        })
      
        if (error != null) {
          console.error(`-- FATAL -- ${FN_NAME}(${address}) --`, error)
          return `${ZERO} ${TICKER}`
        }
      
        return data
    }

    return b
}
