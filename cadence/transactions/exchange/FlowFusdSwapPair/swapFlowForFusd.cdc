import FungibleToken from 0xFUNGIBLETOKENADDRESS
import FlowToken from 0xFLOWTOKENADDRESS
import FUSD from 0xFUSDADDRESS
import FlowFusdSwapPair from 0xFLOWFUSDSWAPPAIRADDRESS

transaction(amountIn: UFix64) {
  // The Vault references that holds the tokens that are being transferred
  let flowVault: &FUSD.Vault
  let fusdVault: &TeleportedTetherToken.Vault

  // The proxy holder reference for access control
  let swapProxyRef: &FlowFusdSwapPair.SwapProxy

  prepare(signer: AuthAccount) {
    self.flowVault = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
      ?? panic("Could not borrow a reference to FlowToken Vault")

    if signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) == nil {
      // Create a new FUSD Vault and put it in storage
      signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

      // Create a public capability to the Vault that only exposes
      // the deposit function through the Receiver interface
      signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
        /public/fusdReceiver,
        target: /storage/fusdVault
      )

      // Create a public capability to the Vault that only exposes
      // the balance field through the Balance interface
      signer.link<&FUSD.Vault{FungibleToken.Balance}>(
        /public/fusdBalance,
        target: /storage/fusdVault
      )
    }

    self.fusdVault = signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)
      ?? panic("Could not borrow a reference to FUSD Vault")

    self.swapProxyRef = proxyHolder.borrow<&FlowFusdSwapPair.SwapProxy>(from: /storage/flowFusdSwapProxy)
      ?? panic("Could not borrow a reference to proxy holder")
  }

  execute {    
    let token1Vault <- self.flowVault.withdraw(amount: amountIn) as! @FlowToken.Vault

    let token2Vault <- self.fusdVault.swapToken1ForToken2(from: <-token1Vault)

    self.tetherVault.deposit(from: <- token2Vault)
  }
}
