import { Token } from 'models/token'
import FLOWImage from 'assets/coins/FLOW.png'
import FUSDImage from 'assets/coins/FUSD.png'

export const tokenConfig = {
    tokens: [
        {
            ticker: 'FLOW',
            contractAddress: '0x12345',
            image: FLOWImage,
            poolAmount: 1000
        },
        {
            ticker: 'FUSD',
            contractAddress: '0x12345',
            image: FUSDImage,
            poolAmount: 5000
        }
    ] as Token[]
}