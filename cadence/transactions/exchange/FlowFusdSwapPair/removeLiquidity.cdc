import FungibleToken from 0xFUNGIBLETOKENADDRESS
import FlowToken from 0xFLOWTOKENADDRESS
import FUSD from 0xFUSDADDRESS
import FlowFusdSwapPair from 0xFLOWFUSDSWAPPAIRADDRESS

transaction(amount: UFix64, token1Amount: UFix64, token2Amount: UFix64) {
  // The Vault reference for liquidity tokens that are being transferred
  let liquidityTokenRef: &FlowFusdSwapPair.Vault

  // The proxy holder reference for access control
  let swapProxyRef: &FlowFusdSwapPair.SwapProxy

  // The Vault references to receive the liquidity tokens
  let flowVaultRef: &FlowToken.Vault
  let fusdVaultRef: &FUSD.Vault

  prepare(signer: AuthAccount) {
    assert(amount == token1Amount + token2Amount: "Incosistent liquidtiy amounts")

    self.liquidityTokenRef = signer.borrow<&FlowFusdSwapPair.Vault>(from: FlowFusdSwapPair.TokenStoragePath)
      ?? panic("Could not borrow a reference to Vault")

    self.swapProxyRef = proxyHolder.borrow<&FlowFusdSwapPair.SwapProxy>(from: /storage/flowFusdSwapProxy)
      ?? panic("Could not borrow a reference to proxy holder")

    self.fusdVaultRef = signer.borrow<&FUSD.Vault>(from: /storage/flowTokenVault)
      ?? panic("Could not borrow a reference to Vault")

    self.tetherVaultRef = signer.borrow<&TeleportedTetherToken.Vault>(from: /storage/fusdVault)
      ?? panic("Could not borrow a reference to Vault")
  }

  execute {
    // Withdraw liquidity provider tokens
    let liquidityTokenVault <- self.liquidityTokenRef.withdraw(amount: amount) as! @FlowFusdSwapPair.Vault

    // Take back liquidity
    let tokenBundle <- self.swapProxyRef.removeLiquidity(from: <-liquidityTokenVault, token1Amount: token1Amount, token2Amount: token2Amount)

    // Deposit liquidity tokens
    self.flowVaultRef.deposit(from: <- tokenBundle.withdrawToken1())
    self.fusdVaultRef.deposit(from: <- tokenBundle.withdrawToken2())

    destroy tokenBundle
  }
}
