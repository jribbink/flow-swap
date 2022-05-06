const resolver = async () => ({
    appIdentifier: "Awesome App (v0.0)",
    nonce: "3037366134636339643564623330316636626239323161663465346131393662",
})

export const fclConfig = {
    baseConfig: {
        "app.detail.title": "Kitten App",
        "app.detail.icon": "https://placekitten.com/g/200/200",
        "service.OpenID.scopes": "email",
    },
    networks: {
        testnet: {
            env: "testnet",
            "accessNode.api": "https://rest-testnet.onflow.org",
            "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
            "fcl.eventsPollRate": 2500,
            "0xLockedTokens": "0x95e019a17d0e23d7",
            "0xFungibleToken": "0x9a0766d93b6608b7",
            "0xFUSD": "0xe223d8a629e49c68",
        },
        local: {
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
           // "fcl.accountProof.resolver": resolver
        }
    }
}