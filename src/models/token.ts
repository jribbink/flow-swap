import { StaticImageData } from "next/image"

export interface Token {
    ticker: string
    contractAddress: string
    path: string
    image: StaticImageData | string
    poolAmount: number
}