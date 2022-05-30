// @ts-ignore
import * as fcl from '@onflow/fcl';
import config from '../../src/config';
import { sign } from './crypto';
import { getFlowConfig } from './flow-config';
import { round } from '../../src/util/util';
import { SwapPair } from 'models/swap-pair';

export const addInitialLiquidity = async (
  swap: SwapPair,
  tokenAIn: number,
  tokenBIn: number
) => {
  const { flowConfig, adminAccount } = await getFlowConfig();

  const authz = (args: any[]) => {
    return Promise.resolve({
      ...args,
      addr: adminAccount.address,
      signingFunction: (signable: any) => {
        return {
          signature: sign(adminAccount.key, signable.message),
          addr: adminAccount.address
        };
      },
      keyId: 0
    });
  };

  const tokenAMin = tokenAIn * (1 - config.clientOptions.slippage);
  const tokenBMin = tokenBIn * (1 - config.clientOptions.slippage);

  const { tokenA, tokenB } = swap;

  const txId = await fcl.mutate({
    args: (arg: any, t: any) => [
      arg(tokenBIn.toFixed(8), t.UFix64),
      arg(tokenAIn.toFixed(8), t.UFix64),
      arg(tokenBMin.toFixed(8), t.UFix64),
      arg(tokenAMin.toFixed(8), t.UFix64)
    ],
    cadence: `
        import FungibleToken from 0xFungibleToken
        import ${tokenA.name} from ${tokenA.address}
        import ${tokenB.name} from ${tokenB.address}
        import ${swap.name} from ${swap.address}
        
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
        `,
    limit: 1000,
    proposer: authz,
    authorizations: [authz],
    payer: authz
  });

  return {
    id: txId,
    description: `Add ${round(tokenAIn, 4)} ${swap.tokenA.ticker} and ${round(
      tokenBIn,
      4
    )} ${swap.tokenB.ticker} liquidity`
  };
};
