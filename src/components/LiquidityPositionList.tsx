import config from 'config';
import useCurrentUser from 'hooks/use-current-user';
import useLiquidityPositions from 'hooks/use-liquidity-positions';
import { LiquidityPosition } from 'models/liquidity-position';
import { Token } from 'models/token';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler, useState } from 'react';
import LiquidityPositionItem from './LiquidityPositionItem';

type LiquidityPositionListProps = {};

export default ({}: LiquidityPositionListProps) => {
  const liquidityPositions = useLiquidityPositions();
  const user = useCurrentUser();
  const router = useRouter();

  const handleAddLiquidityLink: MouseEventHandler = (e) => {
    router.push((e.target as HTMLLinkElement).href);
    e.preventDefault();
  };

  const addLiquidityUrl = config.pairs[0].generateAddLiquidityUrl();

  if (user.loggedIn) {
    if (liquidityPositions.length == 0) {
      return (
        <div className="p-4">
          You have no active liquidity positions, please{' '}
          <a
            href={addLiquidityUrl}
            className="text-decoration-none"
            onClick={handleAddLiquidityLink}
          >
            add a liquidity position
          </a>{' '}
          to get started.
        </div>
      );
    }
    return (
      <>
        {liquidityPositions.map((position) => (
          <LiquidityPositionItem
            key={position.pair?.tokenA + '/' + position.pair?.tokenB}
            position={position}
          />
        ))}
      </>
    );
  } else {
    return (
      <div className="p-4">Connect your wallet to view your liquidity</div>
    );
  }
};
