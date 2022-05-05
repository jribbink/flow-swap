import AddLiquidityContainer from 'components/AddLiquidityContainer'
import Layout from 'components/Layout'
import LiquidityContainer from 'components/LiquidityContainer'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add Liquidity</title>
        <meta name="description" content="FCL Demo App" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Layout>
        <AddLiquidityContainer></AddLiquidityContainer>
      </Layout>
    </>
  )
}

export default Home
