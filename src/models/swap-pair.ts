import { Token } from "./token";

export class SwapPair {
    name!: string
    tokenA!: Token
    tokenB!: Token
    address!: string

    constructor(data: NonOptional<SwapPair>) {
        Object.assign(this, data)
    }

    generateAddLiquidityUrl() {
        return Token.generateAddLiquidityUrl(this.tokenA, this.tokenB)
    }
}