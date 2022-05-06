import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken
import FUSD from 0xFUSD
import FlowFusdSwapPair from 0xFlowFusdSwapPair

transaction(token1Amount: UFix64, token2Amount: UFix64) {
  // The Vault references that holds the tokens that are being transferred
  let flowVault: &FlowToken.Vault
  let fusdVault: &FUSD.Vault

  // The proxy holder reference for access control
  let swapProxyRef: &FlowFusdSwapPair.SwapProxy

  // The Vault reference for liquidity tokens
  let liquidityTokenRef: &FlowFusdSwapPair.Vault

  prepare(signer: AuthAccount, proxyHolder: AuthAccount) {
    self.flowVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
        ?? panic("Could not borrow a reference to Vault")

    self.fusdVault = signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)
        ?? panic("Could not borrow a reference to Vault")

    if signer.borrow<&FlowFusdSwapPair.Vault>(from: FlowFusdSwapPair.TokenStoragePath) == nil {
      // Create a new flowToken Vault and put it in storage
      signer.save(<-FlowFusdSwapPair.createEmptyVault(), to: FlowFusdSwapPair.TokenStoragePath)

      // Create a public capability to the Vault that only exposes
      // the deposit function through the Receiver interface
      signer.link<&FlowFusdSwapPair.Vault{FungibleToken.Receiver}>(
        FlowFusdSwapPair.TokenPublicReceiverPath,
        target: FlowFusdSwapPair.TokenStoragePath
      )

      // Create a public capability to the Vault that only exposes
      // the balance field through the Balance interface
      signer.link<&FlowFusdSwapPair.Vault{FungibleToken.Balance}>(
        FlowFusdSwapPair.TokenPublicBalancePath,
        target: FlowFusdSwapPair.TokenStoragePath
      )
    }

    self.swapProxyRef = proxyHolder.borrow<&FlowFusdSwapPair.SwapProxy>(from: /storage/fusdUsdtSwapProxy)
      ?? panic("Could not borrow a reference to proxy holder")

    self.liquidityTokenRef = signer.borrow<&FlowFusdSwapPair.Vault>(from: FlowFusdSwapPair.TokenStoragePath)
      ?? panic("Could not borrow a reference to Vault")
  }

  execute {
    // Withdraw tokens
    let token1Vault <- self.flowVault.withdraw(amount: token1Amount) as! @FlowToken.Vault
    let token2Vault <- self.fusdVault.withdraw(amount: token2Amount) as! @FUSD.Vault

    // Provide liquidity and get liquidity provider tokens
    let tokenBundle <- FlowFusdSwapPair.createTokenBundle(fromToken1: <- token1Vault, fromToken2: <- token2Vault)
    let liquidityTokenVault <- self.swapProxyRef.addLiquidity(from: <- tokenBundle)

    // Keep the liquidity provider tokens
    self.liquidityTokenRef.deposit(from: <- liquidityTokenVault)
  }
}