import { tokenConfig } from "config/token-config"
import useCurrentUser from "hooks/use-current-user"
import { Currency } from "models/currency"
import { Token } from "models/token"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ConnectWalletButton from "./ConnectWalletButton"
import SwapButton from "./SwapButton"
import TokenInput from "./TokenInput"

export default () => {
    const tokens = tokenConfig.tokens
    const defaultTokenFrom = tokenConfig.tokens[0]

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

    function updateTokenAmounts(
        changedAmount: number,
        setOtherAmount: Dispatch<SetStateAction<number>>,
        changedToken?: Token,
        otherToken?: Token
    ) {
        setOtherAmount(changedAmount)
    }

    useEffect(() => updateTokenAmounts(amountTo, setAmountFrom, tokenTo, tokenFrom), [amountTo])
    useEffect(() => updateTokenAmounts(amountFrom, setAmountTo, tokenFrom, tokenTo), [amountFrom])

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
                variant="from"
                availableTokens={availableTokens}
                tokens={tokenConfig.tokens}
                token={tokenFrom}
                onChangeAmount={setAmountFrom}
                onChangeToken={onChangeTokenFrom}
            />
            <TokenInput
                variant="to"
                availableTokens={availableTokens}
                tokens={tokenConfig.tokens}
                token={tokenTo}
                onChangeAmount={setAmountTo}
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