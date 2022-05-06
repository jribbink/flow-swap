import config from "config"
import useCurrentUser from "hooks/use-current-user"
import { Currency } from "models/currency"
import { Token } from "models/token"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import ConnectWalletButton from "./ConnectWalletButton"
import SwapButton from "./SwapButton"
import TokenInput from "./TokenInput"

function round (value: number, precision: number) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)
}

export default () => {
    const tokens = config.tokens
    const defaultTokenFrom = config.tokens[0]

    const [disabledText, setDisabledText] = useState<string | null>("Select a token")
    const [availableTokens, setAvailableTokens] = useState(tokens)
    const [amountFrom, setAmountFrom] = useState(0)
    const [amountTo, setAmountTo] = useState(0)
    const [tokenFrom, setTokenFrom] = useState(defaultTokenFrom)
    const [tokenTo, setTokenTo] = useState<Token | undefined>()

    const user = useCurrentUser()

    const buttonClassName = "w-100 p-3 rounded-4"
    const buttonStyles = {fontSize: '20px'}

    useEffect(function updateAvailableTokens() {
        setAvailableTokens(tokens.filter(token =>
            token.ticker != tokenFrom.ticker && token.ticker != tokenTo?.ticker
        ))
    }, [tokenFrom, tokenTo])

    useEffect(function updateSwapButtonStatus() {
        if (!tokenTo || !tokenFrom) setDisabledText("Select a Token")
        else if (!amountFrom) setDisabledText("Enter an amount")
        else setDisabledText(null)
    }, [tokenTo, tokenFrom, amountFrom])


    // Ref that stores whether next token update should be ignored (prevent looping amount changes between to/from) 
    const tokenChangedRef = useRef<boolean>(false)

    function updateTokenAmounts(
        changedAmount: number,
        setOtherAmount: Dispatch<SetStateAction<number>>,
        changedToken?: Token,
        otherToken?: Token,
        str?: string
    ) {
        if(tokenChangedRef.current == true) {
            tokenChangedRef.current = false
            return
        } else {
            tokenChangedRef.current = true
        }

        return

        let ratio = 0
        if(otherToken?.poolAmount && changedToken?.poolAmount)
            ratio = otherToken?.poolAmount / changedToken.poolAmount

        setOtherAmount(round(changedAmount * ratio, 8))
    }

    useEffect(() => updateTokenAmounts(amountFrom, setAmountTo, tokenFrom, tokenTo), [tokenTo, tokenFrom, amountFrom])
    useEffect(() => updateTokenAmounts(amountTo, setAmountFrom, tokenTo, tokenFrom), [amountTo])

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
    
    return (
        <div className="bg-white mx-auto rounded-4 p-4 shadow" style={{maxWidth: '400px'}}>
            <div style={{'fontSize': '18px', 'fontWeight': '550'}}>Swap</div>
            <TokenInput
                label="From"
                availableTokens={availableTokens}
                tokens={config.tokens}
                amount={amountFrom}
                token={tokenFrom}
                onChangeAmount={newAmount => setAmountFrom(newAmount)}
                onChangeToken={onChangeTokenFrom}
            />
            <TokenInput
                label="To"
                availableTokens={availableTokens}
                tokens={config.tokens}
                amount={amountTo}
                token={tokenTo}
                onChangeAmount={newAmount => setAmountTo(newAmount)}
                onChangeToken={onChangeTokenTo}
            ></TokenInput>
            {
                !user.loggedIn
                ? 
                    <ConnectWalletButton className={buttonClassName} styles={buttonStyles}></ConnectWalletButton>
                :
                    <SwapButton className={buttonClassName} styles={buttonStyles} disabledText={disabledText}></SwapButton>
            }
        </div>
    )
}