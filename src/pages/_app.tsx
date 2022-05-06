import "styles/styles.css"
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import useConfig from 'hooks/use-fcl-config'
import Layout from "components/Layout"

function KittyApp({ Component, pageProps }: AppProps) {
  useConfig()

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default KittyApp
