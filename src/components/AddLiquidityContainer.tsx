import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AddLiquidityHeader from './AddLiquidityHeader'
import TokenInput from './TokenInput'
import config from 'config'
import { useEffect, useState } from 'react'
import { Token } from 'models/token'
import { useRouter } from 'next/router'
import AddLiquidityShareInfo from './AddLiquidityShareInfo'
import TransactionButton from './TransactionButton'


export default () => {
    const router = useRouter()
    if ((router.query.params?.length ?? 0) > 2) router.replace('/pool/add')


    const [tokenA, tokenB] = (router.query.params as string[] ?? []).map(tokenUri => {
        const info = Token.decodeFromUri((tokenUri ?? "") as string)
        return config.tokens.find(token =>
            token.address == info.address && token.name == info.contract
        )
    })

    const setTokenA = (token: Token) => {
        router.push(Token.generateAddLiquidityUrl(token, tokenB))
    }

    const setTokenB = (token: Token) => {
        router.push(Token.generateAddLiquidityUrl(tokenA, token))
    }

    const [amountA, setAmountA] = useState<number>()
    const [amountB, setAmountB] = useState<number>()

    const getDisabledText = () => {
        return null
    }

    return (
        <div className="mx-auto bg-white rounded-4 p-4" style={{maxWidth: '400px'}}>
            <AddLiquidityHeader></AddLiquidityHeader>
            <TokenInput
                label='Input'
                tokens={config.tokens}
                token={tokenA}
                amount={amountA}
                onChangeToken={setTokenA}
            ></TokenInput>
            <TokenInput
                label='Input'
                tokens={config.tokens}
                token={tokenB}
                amount={amountB}
                onChangeToken={setTokenB}
            ></TokenInput>
            <div className="my-4">
                {
                    tokenA && tokenB
                        ? <AddLiquidityShareInfo tokenA={tokenA} tokenB={tokenB}></AddLiquidityShareInfo>
                        : null
                }
            </div>
            <TransactionButton text="Supply" disabledText={getDisabledText()}></TransactionButton>
        </div>
    )
}