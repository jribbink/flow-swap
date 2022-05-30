import 'styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { AppProps } from 'next/app';
import useFclConfig from 'hooks/use-fcl-config';
import Layout from 'components/Layout';
import { useEffect } from 'react';

// @ts-ignore
import * as fcl from '@onflow/fcl';
import { AppContextProvider } from 'contexts/app-context-provider';

function KittyApp({ Component, pageProps }: AppProps) {
  // Config fcl
  useFclConfig();
  // Export fcl to console
  useEffect(() => {
    (window as any).fcl = fcl;
  }, []);

  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default KittyApp;
