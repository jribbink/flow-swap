import { StaticImageData } from "next/image"

export class Token {
    name!: string
    displayName!: string
    ticker!: string
    address!: string
    vaultPath!: string
    receiverPath!: string
    balancePath!: string
    image!: StaticImageData | string

    constructor(data: NonOptional<Token>) {
        Object.assign(this, data)
    }

    get uri () {
        const address = this.address.match(/^(0[xX])?([0-9a-fA-F]+)/)?.at(2)?.toLowerCase()
        return `A.${address}.${this.name}`
    }

    static decodeFromUri (tokenUri: string) {
        const match = tokenUri.match(/^A.([0-9a-fA-F]+).([A-Za-z]+)/)
        return {
            address: '0x' + match?.at(1)?.toLowerCase(),
            contract: match?.at(2)
        }
    }

    static generateAddLiquidityUrl (tokenFrom?: Token, tokenTo?: Token) {
        return `/pool/add/${
            tokenFrom?.uri ?? 'A.0000000000000000.NoToken'
        }/${
            tokenTo ? (tokenTo.uri + '/') : ''
        }`
    }
}