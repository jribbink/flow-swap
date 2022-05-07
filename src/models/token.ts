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
}