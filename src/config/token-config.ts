import { Token } from 'models/token'
import FlowImage from 'assets/flow.png'

export const tokenConfig = {
    tokens: [
        {
            ticker: 'FLOW',
            contractAddress: '0x12345',
            image: FlowImage
        },
        {
            ticker: 'FUSD',
            contractAddress: '0x12345',
            image: FlowImage
        }
    ] as Token[]
}