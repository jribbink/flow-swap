import { Token } from 'models/token';

type RemoveLiquidityContainerProps = {
  tokenA?: Token;
  tokenB?: Token;
};

export default ({ tokenA, tokenB }: RemoveLiquidityContainerProps) => {
  return <div className="mx-auto">Hello</div>;
};
