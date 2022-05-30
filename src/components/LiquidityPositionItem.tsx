import { LiquidityPosition } from 'models/liquidity-position';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { numberToPercent } from 'util/util';

type LiquidityPositionProps = {
  position: LiquidityPosition;
};

export default ({
  position: { pair, poolA, poolB, share, tokenAmount }
}: LiquidityPositionProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div>
      <button
        className="p-4 d-flex flex-row align-items-center w-100 btn shadow-none"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Image src={pair.tokenA.image} width="30" height="30" />
        <Image src={pair.tokenB.image} width="30" height="30" />
        <span className="px-3">
          {pair.tokenA.ticker + '/' + pair.tokenB.ticker}
        </span>
      </button>
      {showDropdown ? (
        <>
          <hr className="m-0"></hr>
          <div className="p-4" style={{ fontSize: '0.9em' }}>
            <LiquidityInfoItem label="Your liquidity tokens:">
              {tokenAmount}
            </LiquidityInfoItem>
            <LiquidityInfoItem label={`Pooled ${pair.tokenA.ticker}:`}>
              {poolA}
            </LiquidityInfoItem>
            <LiquidityInfoItem label={`Pooled ${pair.tokenB.ticker}:`}>
              {poolB}
            </LiquidityInfoItem>
            <LiquidityInfoItem label="Your pool share:">
              {numberToPercent(share)}
            </LiquidityInfoItem>
            <div className="d-flex flex-row mt-3" style={{ gap: '15px' }}>
              <Link href={pair.generateAddLiquidityUrl()}>
                <div
                  className="btn btn-success col shadow-none"
                  style={{ borderRadius: '10px' }}
                >
                  Add
                </div>
              </Link>
              <Link href={pair.generateRemoveLiquidityUrl()}>
                <div
                  className="btn btn-success col shadow-none"
                  style={{ borderRadius: '10px' }}
                >
                  Remove
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

const LiquidityInfoItem = ({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="d-flex flex-row">
      <span style={{ fontWeight: '600' }}>{label}</span>
      <span className="ms-auto">{children}</span>
    </div>
  );
};
