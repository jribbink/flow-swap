// @ts-ignore
import * as fcl from '@onflow/fcl'
import config from 'config'
import { Token } from 'models/token'
import { findPair } from './util'

export function exchangeTokens(tokenFrom: Token, tokenTo: Token, amountIn: number) {
    const minAmountOut = amountIn * (1 - config.clientOptions.slippage)

    const pair = findPair(tokenFrom, tokenTo)!
    const { tokenA, tokenB } = pair

    const inOrder = tokenA.ticker == tokenFrom.ticker

    fcl.mutate({
        args: (arg: any, t: any) => [
            arg(amountIn.toFixed(8), t.UFix64),
            arg(minAmountOut.toFixed(8), t.UFix64)
        ],
        cadence: `
        import FungibleToken from 0xFungibleToken
        import ${tokenA.name} from ${tokenA.address}
        import ${tokenB.name} from ${tokenB.address}
        import ${pair.name} from ${pair.address}
        
        transaction(amountIn: UFix64, minAmountOut: UFix64) {
          prepare(signer: AuthAccount) {

            let ${tokenFrom.name}Vault = signer.borrow<&${tokenFrom.name}.Vault>(from: ${tokenFrom.vaultPath}) 
              ?? panic("Could not borrow a reference to Vault")
        
            let token0Vault <- ${tokenFrom.name}Vault.withdraw(amount: amountIn) as! @${tokenFrom.name}.Vault
            let token1Vault <- ${pair.name}.${inOrder?'swapToken1ForToken2':'swapToken2ForToken1'}(from: <- token0Vault)
        
            if signer.borrow<&${tokenTo.name}.Vault>(from: ${tokenTo.vaultPath}) == nil {
                signer.save(<-${tokenTo.name}.createEmptyVault(), to: ${tokenTo.vaultPath})
                signer.link<&${tokenTo.name}.Vault{FungibleToken.Receiver}>(
                    ${tokenTo.receiverPath},
                    target: ${tokenTo.vaultPath}
                )
                signer.link<&${tokenTo.name}.Vault{FungibleToken.Balance}>(
                    ${tokenTo.balancePath},
                    target: ${tokenTo.vaultPath}
                )
            }
            let ${tokenTo.name}TokenVault = signer.borrow<&${tokenTo.name}.Vault>(from: ${tokenTo.vaultPath}) 
              ?? panic("Could not borrow a reference to Vault")
        
            assert(token1Vault.balance >= minAmountOut, message: "Output amount too small")
        
            ${tokenTo.name}TokenVault.deposit(from: <- token1Vault)
          }
        }
        `,
        limit: 100
    }).then(res => {
        alert("TRANSACTION SUCCEEDED!")
    })
}