import AddLiquidityHeader from './AddLiquidityHeader'
import TokenInput from './TokenInput'
import config from 'config'
import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react'
import { Token } from 'models/token'
import { useRouter } from 'next/router'
import AddLiquidityShareInfo from './AddLiquidityShareInfo'
import TransactionButton from './TransactionButton'
import usePoolAmounts from 'hooks/use-pool-amounts'
import useCurrentUser from 'hooks/use-current-user'
import { addLiquidity } from 'util/add-liquidity'
import { findPair, round } from 'util/util'
import { quoteMarketValue, quoteTransaction } from 'util/quote'
import { useBalance } from 'hooks/use-balance'


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
    const balanceA = useBalance(tokenA, user.addr)
    const balanceB = useBalance(tokenB, user.addr)
    const poolAmounts = usePoolAmounts(tokenA, tokenB)

    const handleSupplyClick: MouseEventHandler = e => {
        const pair = findPair(tokenA, tokenB)
        addLiquidity(pair!, amountA, amountB)
    }

    // Ref that stores whether next token update should be ignored (prevent looping amount changes between to/from) 
    const tokenChangedRef = useRef<boolean>(false)

    function updateTokenAmounts(
        changedAmount: number,
        setOtherAmount: Dispatch<SetStateAction<number>>,
        isAmountTo: boolean
    ) {
        if(tokenChangedRef.current == true) {
            tokenChangedRef.current = false
            return
        } else {
            tokenChangedRef.current = true
        }
        
        setOtherAmount(quoteMarketValue(changedAmount, poolAmounts, tokenA, tokenB))
    }

    useEffect(() => updateTokenAmounts(amountA, setAmountB, false), [tokenA, tokenB, amountA])
    useEffect(() => updateTokenAmounts(amountB, setAmountA, true), [amountB])

    function buttonDisabledText() {
        if (!tokenA || !tokenB) return "Select a Token"
        else if (!amountA || !amountB) return "Enter an amount"
        else if (amountA > balanceA || amountB > balanceB) return "Insufficient Funds"
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