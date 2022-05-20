import FungibleToken from "../contracts/token/FungibleToken.cdc"
import FlowToken from "../contracts/token/FlowToken.cdc"
import FUSD from "../contracts/token/FUSD.cdc"
import FlowFusdSwapPair from "../contracts/exchange/FlowFusdSwapPair.cdc"

transaction(token2In: UFix64, token1In: UFix64, token2Min: UFix64, token1Min: UFix64) {
  // The Vault references that holds the tokens that are being transferred
  let ${tokenA.name}VaultRef: &${tokenA.name}.Vault
  let ${tokenB.name}VaultRef: &${tokenB.name}.Vault

  // The Vault reference for liquidity tokens
  let liquidityTokenRef: &${swap.name}.Vault

  prepare(signer: AuthAccount) {
    self.${tokenA.name}VaultRef = signer.borrow<&${tokenA.name}.Vault>(from: ${tokenA.vaultPath})
        ?? panic("Could not borrow a reference to Vault")

    self.${tokenB.name}VaultRef = signer.borrow<&${tokenB.name}.Vault>(from: ${tokenB.vaultPath})
        ?? panic("Could not borrow a reference to Vault")

    if signer.borrow<&${swap.name}.Vault>(from: ${swap.name}.TokenStoragePath) == nil {
      // Create a new flowToken Vault and put it in storage
      signer.save(<-${swap.name}.createEmptyVault(), to: ${swap.name}.TokenStoragePath)

      // Create a public capability to the Vault that only exposes
      // the deposit function through the Receiver interface
      signer.link<&${swap.name}.Vault{FungibleToken.Receiver}>(
        ${swap.name}.TokenPublicReceiverPath,
        target: ${swap.name}.TokenStoragePath
      )

      // Create a public capability to the Vault that only exposes
      // the balance field through the Balance interface
      signer.link<&${swap.name}.Vault{FungibleToken.Balance}>(
        ${swap.name}.TokenPublicBalancePath,
        target: ${swap.name}.TokenStoragePath
      )
    }

    self.liquidityTokenRef = signer.borrow<&${swap.name}.Vault>(from: ${swap.name}.TokenStoragePath)
      ?? panic("Could not borrow a reference to Vault")
  }

  execute {
    let poolAmounts = ${swap.name}.getPoolAmounts()



    let token1Amount = token1In
    let token2Amount = token2In
    
    let token1Vault <- self.${tokenA.name}VaultRef.withdraw(amount: token1Amount) as! @${tokenA.name}.Vault
    let token2Vault <- self.${tokenB.name}VaultRef.withdraw(amount: token2Amount) as! @${tokenB.name}.Vault

    let tokenBundle <- ${swap.name}.createTokenBundle(fromToken1: <- token1Vault, fromToken2: <- token2Vault);
    let liquidityTokenVault <- ${swap.name}.addLiquidity(from: <- tokenBundle)

    self.liquidityTokenRef.deposit(from: <- liquidityTokenVault)
  }
}