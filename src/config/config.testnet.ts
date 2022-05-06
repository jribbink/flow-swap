import { Token } from 'models/token'
import FLOWImage from 'assets/coins/FLOW.png'
import FUSDImage from 'assets/coins/FUSD.png'

export default {
    fcl: {
        env: "testnet",
        "accessNode.api": "https://rest-testnet.onflow.org",
        "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
        "fcl.eventsPollRate": 2500,
        "0xLockedTokens": "0x95e019a17d0e23d7",
        "0xFungibleToken": "0x9a0766d93b6608b7",
        "0xFUSD": "0xe223d8a629e49c68",
    },
    tokens: <Token[]>[
        {
            name: "FlowToken",
            displayName: "Flow Token",
            ticker: 'FLOW',
            address: '0x7e60df042a9c0868',
            vaultPath: '/storage/flowTokenVault',
            receiverPath: '/public/flowTokenReceiver',
            balancePath: '/public/flowTokenBalance',
            image: FLOWImage,
        },
        {
            name: 'FUSD',
            displayName: 'Flow USD',
            ticker: 'FUSD',
            address: '0xe223d8a629e49c68',
            vaultPath: '/storage/fusdVault',
            receiverPath: '/public/fusdReceiver',
            balancePath: '/public/fusdBalance',
            image: FUSDImage
        }
    ]
}