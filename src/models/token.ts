import { StaticImageData } from "next/image"

export class Token {
    name!: String
    displayName!: String
    ticker!: string
    address!: string
    vaultPath!: String
    receiverPath!: String
    balancePath!: String
    image!: StaticImageData | string

    constructor(data: NonOptional<Token>) {
        Object.assign(this, data)
    }
}