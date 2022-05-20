import { PoolAmount } from 'models/pool-amount';
import { Token } from 'models/token';
import { round } from './util';

export function quoteTransaction(
  amount: number,
  poolAmounts: PoolAmount,
  tokenFrom?: Token,
  tokenTo?: Token,
  isAmountTo: boolean = false
) {
  let quote = 0;
  if (
    tokenTo &&
    tokenFrom &&
    poolAmounts[tokenTo.uri] &&
    poolAmounts[tokenFrom.uri]
  ) {
    if (isAmountTo) {
      quote =
        (amount * poolAmounts[tokenFrom.uri]) /
        (poolAmounts[tokenTo.uri] - amount);
    } else {
      quote =
        (poolAmounts[tokenTo.uri] * amount) /
        (poolAmounts[tokenFrom.uri] + amount);
    }
  }

  return round(quote, 8);
}

export function quoteMarketValue(
  amount: number,
  poolAmounts: PoolAmount,
  tokenFrom?: Token,
  tokenTo?: Token
) {
  let ratio = 0;
  if (
    tokenTo &&
    tokenFrom &&
    poolAmounts[tokenTo.uri] &&
    poolAmounts[tokenFrom.uri]
  ) {
    ratio = poolAmounts[tokenTo.uri] / poolAmounts[tokenFrom.uri];
  }

  return round(amount * ratio, 8);
}
