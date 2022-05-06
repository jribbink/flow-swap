import { Token } from 'models/token'
import FLOWImage from 'assets/coins/FLOW.png'
import FUSDImage from 'assets/coins/FUSD.png'

export default {
    fcl: {
        "env": "local",
        "debug.accounts": true,
        "logger.level": 2,
        "accessNode.api": "http://localhost:8888",
        "discovery.wallet": "http://localhost:8701/fcl/authn",
        "discovery.wallet.method.default": "IFRAME/RPC",
        "0xFungibleToken": "0xee82856bf20e2aa6",
        "0xFUSD": "0xf8d6e0586b0a20c7",
        "0xFlowFusdSwapPair": "0xf8d6e0586b0a20c7",
        "0xFlowToken": "0x0ae53cb6e3f42a79"
    },
    tokens: <Token[]>[
        {
            name: "FlowToken",
            displayName: "Flow Token",
            ticker: 'FLOW',
            address: '0x0ae53cb6e3f42a79',
            vaultPath: '/storage/flowTokenVault',
            receiverPath: '/public/flowTokenReceiver',
            balancePath: '/public/flowTokenBalance',
            image: FLOWImage,
        },
        {
            name: 'FUSD',
            displayName: 'Flow USD',
            ticker: 'FUSD',
            address: '0xf8d6e0586b0a20c7',
            vaultPath: '/storage/fusdVault',
            receiverPath: '/public/fusdReceiver',
            balancePath: '/public/fusdBalance',
            image: FUSDImage
        }
    ]
}