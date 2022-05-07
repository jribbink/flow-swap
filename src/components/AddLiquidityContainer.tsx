import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AddLiquidityHeader from './AddLiquidityHeader'
import TokenInput from './TokenInput'
import config from 'config'
import { MouseEventHandler, useEffect, useState } from 'react'
import { Token } from 'models/token'
import { useRouter } from 'next/router'
import AddLiquidityShareInfo from './AddLiquidityShareInfo'
import TransactionButton from './TransactionButton'
import usePoolAmounts from 'hooks/use-pool-amounts'
import { SwapPair } from 'models/swap-pair'
import useCurrentUser from 'hooks/use-current-user'
import { addLiquidity } from 'util/add-liquidity'
import { findPair } from 'util/util'
import { TokenAmount } from 'models/token-amount'
import TetheredTokenInput from './TetheredTokenInput'


export default () => {
    const router = useRouter()
    if ((router.query.params?.length ?? 0) > 2) router.replace('/pool/add')

    const [tokenAmounts, setTokenAmounts] = useState<TokenAmount[]>((router.query.params as string[] ?? []).map(tokenUri => {
        const info = Token.decodeFromUri((tokenUri ?? "") as string)
        return {
            token: config.tokens.find(token => token.address == info.address && token.name == info.contract),
            amount: 0
        }
    }))

    const [tokenA, tokenB] = tokenAmounts

    const setTokenA = (token: Token) => {
        router.push(Token.generateAddLiquidityUrl(token, tokenB.token))
    }

    const setTokenB = (token: Token) => {
        router.push(Token.generateAddLiquidityUrl(tokenA.token, token))
    }

    const [amountA, setAmountA] = useState<number>()
    const [amountB, setAmountB] = useState<number>()

    const user = useCurrentUser()
    const poolAmounts = usePoolAmounts(user.addr, tokenA?.token, tokenB?.token)

    const getDisabledText = () => {
        return null
    }

    const handleSupplyClick: MouseEventHandler = e => {
        const pair = findPair(tokenA.token, tokenB.token)
        addLiquidity(pair!, 10, 10)
    }

    return (
        <div className="mx-auto bg-white rounded-4 p-4" style={{maxWidth: '400px'}}>
            <AddLiquidityHeader></AddLiquidityHeader>
            <TetheredTokenInput value={tokenAmounts} onChange={setTokenAmounts}></TetheredTokenInput>
            <div className="my-4">
                {
                    tokenA && tokenB && poolAmounts
                        ? <AddLiquidityShareInfo tokenA={tokenA?.token} tokenB={tokenB?.token} amountA={tokenA?.amount}></AddLiquidityShareInfo>
                        : null
                }
            </div>
            <TransactionButton text="Supply" disabledText={getDisabledText()} onClick={handleSupplyClick}></TransactionButton>
        </div>
    )
}