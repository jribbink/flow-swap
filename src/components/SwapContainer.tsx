import config from "config"
import useCurrentUser from 'hooks/use-current-user'
import { Token } from "models/token"
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import TransactionButton from "./TransactionButton"
import TokenInput from "./TokenInput"
import usePoolAmounts from "hooks/use-pool-amounts"
import { exchangeTokens } from "util/exchange-tokens"
import { quoteTransaction } from "util/quote"
import { useBalance } from "hooks/use-balance"
import { TransactionsContext } from "contexts/transactions-context"
import { mutate } from "swr"
import { KEY } from "hooks/use-all-pool-amounts"

export default () => {
    const tokens = config.tokens
    const defaultTokenFrom = config.tokens[0]

    const [amountFrom, setAmountFrom] = useState(0)
    const [amountTo, setAmountTo] = useState(0)
    const [tokenFrom, setTokenFrom] = useState(defaultTokenFrom)
    const [tokenTo, setTokenTo] = useState<Token | undefined>()

    const user = useCurrentUser()
    const balanceFrom = useBalance(tokenFrom, user.addr)
    const poolAmounts = usePoolAmounts(tokenFrom, tokenTo)
    const [transactions, executeTransaction] = useContext(TransactionsContext)

    //useEffect(() => { mutate(KEY) }, [])

    function getButtonDisabledText() {
        if (amountFrom < 0) return "Not Enough Tokens in Pool"
        else if (!tokenTo || !tokenFrom) return "Select a Token"
        else if (!amountFrom || !amountTo) return "Enter an amount"
        else if (amountFrom > balanceFrom) return "Insufficient Funds"
        else return null
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

        setOtherAmount(quoteTransaction(changedAmount, poolAmounts, tokenFrom, tokenTo, isAmountTo))
    }

    useEffect(() => updateTokenAmounts(amountFrom, setAmountTo, false), [tokenTo, tokenFrom, amountFrom])
    useEffect(() => updateTokenAmounts(amountTo, setAmountFrom, true), [amountTo])

    const onChangeTokenFrom = (token: Token) => {
        if(token.ticker == tokenTo?.ticker) {
            setTokenTo(tokenFrom)
        }
        setTokenFrom(token)
    }

    const onChangeTokenTo = (token: Token) => {
        if(token.ticker == tokenFrom?.ticker) {
            setTokenFrom(tokenTo!)
        }
        setTokenTo(token)
    }

    const onSwapClick = () => {
        if (!tokenTo) return
        executeTransaction(() => exchangeTokens(tokenFrom, tokenTo, amountFrom, amountTo))
    }
    
    return (
        <div className="bg-white mx-auto rounded-4 p-4 shadow" style={{maxWidth: '400px'}}>
            <div style={{'fontSize': '18px', 'fontWeight': '550'}}>Swap</div>
            <TokenInput
                label="From"
                tokens={config.tokens}
                amount={Math.max(0, amountFrom)}
                token={tokenFrom}
                onChangeAmount={newAmount => setAmountFrom(newAmount)}
                onChangeToken={onChangeTokenFrom}
            />
            <TokenInput
                label="To"
                tokens={config.tokens}
                amount={amountTo}
                token={tokenTo}
                onChangeAmount={newAmount => setAmountTo(newAmount)}
                onChangeToken={onChangeTokenTo}
            ></TokenInput>
            <TransactionButton text="Swap" disabledText={getButtonDisabledText()} onClick={onSwapClick}></TransactionButton>
        </div>
    )
}