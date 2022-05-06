import "styles/styles.css"
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import useFclConfig from 'hooks/use-fcl-config'
import Layout from "components/Layout"
import { useEffect } from "react"

// @ts-ignore
import * as fcl from '@onflow/fcl'

function KittyApp({ Component, pageProps }: AppProps) {
  // Config fcl
  useFclConfig()
  // Export fcl to console
  useEffect(() => {(window as any).fcl = fcl}, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default KittyApp
