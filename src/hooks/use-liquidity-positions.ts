import { useAllBalances } from './use-all-balances';
import useCurrentUser from './use-current-user';
import { LiquidityPosition } from 'models/liquidity-position';
import usePoolAmounts from './use-all-pool-amounts';

export default () => {
  const user = useCurrentUser();
  const balances = useAllBalances(user.addr);
  const poolAmounts = usePoolAmounts();

  return balances.pairs.reduce((acc, pair) => {
    if (pair.balance > 0) {
      acc.push(<LiquidityPosition>{
        pair: pair.pair,
        tokenAmount: pair.balance,
        share: pair.balance / poolAmounts[pair.pair.name].totalPoolTokens,
        poolA: poolAmounts[pair.pair.name][pair.pair.tokenA.uri],
        poolB: poolAmounts[pair.pair.name][pair.pair.tokenB.uri]
      });
    }
    return acc;
  }, <LiquidityPosition[]>[]);
};
