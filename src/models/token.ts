import { StaticImageData } from "next/image"

export interface Token {
    ticker: string
    contractAddress: string
    image: StaticImageData | string
}