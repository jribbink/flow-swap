import AddLiquidityContainer from 'components/AddLiquidityContainer';
import config from 'config';
import { Token } from 'models/token';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  if ((router.query.params?.length ?? 0) > 2) router.replace('/pool/add');

  const [tokenA, tokenB] = ((router.query.params as string[]) ?? []).map(
    (tokenUri) => {
      const info = Token.decodeFromUri((tokenUri ?? '') as string);
      return config.tokens.find(
        (token) => token.address == info.address && token.name == info.contract
      );
    }
  );

  return (
    <AddLiquidityContainer
      tokenA={tokenA}
      tokenB={tokenB}
    ></AddLiquidityContainer>
  );
};

export default Home;
