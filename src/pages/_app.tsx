import "styles/styles.css"
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import useConfig from 'hooks/use-fcl-config'

function KittyApp({ Component, pageProps }: AppProps) {
  useConfig()

  return (
    <Component {...pageProps} />
  )
}

export default KittyApp
