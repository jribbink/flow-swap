import { PoolAmount } from 'models/pool-amount';
import { Token } from 'models/token';
import { findPair } from 'util/util';
import useAllPoolAmounts from './use-all-pool-amounts';

export default function usePoolAmounts(tokenA?: Token, tokenB?: Token) {
  const poolAmounts = useAllPoolAmounts();
  const pair = findPair(tokenA, tokenB);

  return poolAmounts && pair
    ? poolAmounts[pair.name]
    : <PoolAmount>{
        totalPoolTokens: 0
      };
}
