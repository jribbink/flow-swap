/**
 * @description Deep merge config.network.ts with config.base.ts
 */

import { Token } from 'models/token'
import { mergeDeep } from 'util/util'

const network = process.env.NETWORK

if (!network) {
    throw new Error("Please provide a network parameter in environment variable NETWORK=")
}

interface Config {
    fcl: any,
    tokens: Token[]
}

const config = <Config>mergeDeep({}, require('./config.base').default, require(`./config.${network}.ts`).default)
export default config