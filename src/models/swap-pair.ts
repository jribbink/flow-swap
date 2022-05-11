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

    generateRemoveLiquidityUrl() {
        return Token.generateRemoveLiquidityUrl(this.tokenA, this.tokenB)
    }
}