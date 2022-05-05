import Layout from 'components/Layout'
import SwapContainer from 'components/SwapContainer'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kitty Shop</title>
        <meta name="description" content="FCL Demo App" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <SwapContainer></SwapContainer>
      </Layout>
    </>
  )
}

export default Home
