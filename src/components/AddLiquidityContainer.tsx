import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AddLiquidityHeader from './AddLiquidityHeader'
import TokenInput from './TokenInput'
import config from 'config'
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react'
import { Token } from 'models/token'
import { useRouter } from 'next/router'
import AddLiquidityShareInfo from './AddLiquidityShareInfo'
import TransactionButton from './TransactionButton'
import usePoolAmounts from 'hooks/use-pool-amounts'
import { SwapPair } from 'models/swap-pair'
import useCurrentUser from 'hooks/use-current-user'
import { addLiquidity } from 'util/add-liquidity'
import { findPair, round } from 'util/util'


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

    const [amountA, setAmountA] = useState<number>(0)
    const [amountB, setAmountB] = useState<number>(0)

    const user = useCurrentUser()
    const poolAmounts = usePoolAmounts(user.addr, tokenA, tokenB)

    const handleSupplyClick: MouseEventHandler = e => {
        const pair = findPair(tokenA, tokenB)
        addLiquidity(pair!, amountA, amountB)
    }

    // Ref that stores whether next token update should be ignored (prevent looping amount changes between to/from) 
    const tokenChangedRef = useRef<boolean>(false)

    function updateTokenAmounts(
        changedAmount: number,
        setOtherAmount: Dispatch<SetStateAction<number>>,
        changedToken: "poolA" | "poolB",
        otherToken: "poolA" | "poolB",
    ) {
        if(tokenChangedRef.current == true) {
            tokenChangedRef.current = false
            return
        } else {
            tokenChangedRef.current = true
        }

        let ratio = 0
        if(poolAmounts?.poolA && poolAmounts?.poolB)
            ratio = poolAmounts[otherToken] / poolAmounts[changedToken]

        setOtherAmount(round(changedAmount * ratio, 8))
    }

    useEffect(() => updateTokenAmounts(amountA, setAmountB, 'poolA', 'poolB'), [tokenB, tokenA, amountA])
    useEffect(() => updateTokenAmounts(amountB, setAmountA, 'poolB', 'poolA'), [amountB])

    function buttonDisabledText() {
        if (!tokenA || !tokenB) return "Select a Token"
        else if (!amountA || !amountB) return "Enter an amount"
        else return null
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
                onChangeAmount={setAmountA}
            ></TokenInput>
            <TokenInput
                label='Input'
                tokens={config.tokens}
                token={tokenB}
                amount={amountB}
                onChangeToken={setTokenB}
                onChangeAmount={setAmountB}
            ></TokenInput>
            <div className="my-4">
                {
                    tokenA && tokenB && poolAmounts
                        ? <AddLiquidityShareInfo tokenA={tokenA} tokenB={tokenB} amountA={amountA}></AddLiquidityShareInfo>
                        : null
                }
            </div>
            <TransactionButton text="Supply" disabledText={buttonDisabledText()} onClick={handleSupplyClick}></TransactionButton>
        </div>
    )
}