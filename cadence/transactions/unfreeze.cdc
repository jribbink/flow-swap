import FlowFusdSwapPair from "../contracts/exchange/FlowFusdSwapPair.cdc"

transaction() {
    let swapAdmin: &FlowFusdSwapPair.Admin
  

  prepare(signer: AuthAccount) {
      self.swapAdmin = signer.borrow<&FlowFusdSwapPair.Admin>(from: /storage/flowFusdPairAdmin) ?? panic("Signer is not token admin")
  }

  execute {
      self.swapAdmin.unfreeze()
  }
}