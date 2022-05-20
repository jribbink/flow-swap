/**
 * @description Deep merge config.network.ts with config.base.ts
 */

import { SwapPair } from 'models/swap-pair';
import { Token } from 'models/token';
import { mergeDeep } from 'util/util';

const network = process.env.NETWORK;

if (!network) {
  throw new Error(
    'Please provide a network parameter in environment variable NETWORK='
  );
}

interface Config {
  network: string;
  fcl: any;
  tokens: Token[];
  pairs: SwapPair[];
  clientOptions: {
    slippage: number;
  };
}

const config = <Config>(
  mergeDeep(
    { network },
    require('./config.base').default,
    require(`./config.${network}.ts`).default
  )
);
export default config;
