import useCurrentUser from "hooks/use-current-user"
import usePoolAmounts from "hooks/use-pool-amounts"
import { TokenAmount } from "models/token-amount"
import { Token } from "models/token"
import config from "config"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { round } from "util/util"
import TokenInput from "./TokenInput"

type TetheredTokenInputProps = {
    onChange: (token: TokenAmount[]) => void,
    value: TokenAmount[]
}

export default ({onChange, value = []}: TetheredTokenInputProps) => {
    const tokens = config.tokens
    const defaultTokenFrom = config.tokens[0]

    const [availableTokens, setAvailableTokens] = useState(tokens)
    const [amountFrom, setAmountFrom] = useState(0)
    const [amountTo, setAmountTo] = useState(0)
    const [tokenFrom, setTokenFrom] = useState<Token | undefined>(defaultTokenFrom)
    const [tokenTo, setTokenTo] = useState<Token | undefined>()

    const skipEffectRef = useRef<boolean>(false)

    useEffect(() => {
        if (skipEffectRef.current) {
            skipEffectRef.current = false
            return
        }
        const [valA, valB] = value
        setAmountFrom(valA?.amount)
        setAmountTo(valB?.amount)
        setTokenFrom(valA?.token)
        setTokenTo(valB?.token)
    }, [value])

    useEffect(function updateAvailableTokens() {
        setAvailableTokens(tokens.filter(token =>
            token.ticker != tokenFrom?.ticker && token.ticker != tokenTo?.ticker
        ))
    }, [tokenFrom, tokenTo])

    // Ref that stores whether next token update should be ignored (prevent looping amount changes between to/from) 
    const tokenChangedRef = useRef<boolean>(false)

    const user = useCurrentUser()
    const poolAmounts = usePoolAmounts(user.addr, tokenFrom, tokenTo)

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

    useEffect(() => updateTokenAmounts(amountFrom, setAmountTo, 'poolA', 'poolB'), [tokenTo, tokenFrom, amountFrom])
    useEffect(() => updateTokenAmounts(amountTo, setAmountFrom, 'poolB', 'poolA'), [amountTo])

    useEffect(() => {
        onChange([
            {
                token: tokenFrom,
                amount: amountFrom
            },
            {
                token: tokenTo,
                amount: amountTo
            }
        ])
        skipEffectRef.current = true
    }, [tokenTo, tokenFrom, amountTo, amountFrom])

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
        <div>
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
        </div>
    )
}