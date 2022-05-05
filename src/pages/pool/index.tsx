import Layout from 'components/Layout'
import LiquidityContainer from 'components/LiquidityContainer'
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
        <LiquidityContainer></LiquidityContainer>
      </Layout>
    </>
  )
}

export default Home
