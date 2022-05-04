import { exists } from "fs"
import { Token } from "models/token"
import { KeyboardEventHandler, useRef, useState } from "react"
import TokenSelect from "./TokenSelect"

const noop = (...args: any[]) => {}

type TokenInputProps = {
    variant: "to" | "from"
    availableTokens?: Token[]
    token?: Token
    tokens: Token[]
    onChangeToken?: (token: Token) => void
    onChangeAmount?: (amount: number) => void
}

export default ({
    variant,
    availableTokens,
    token,
    tokens,
    onChangeToken = noop,
    onChangeAmount = noop,
}: TokenInputProps) => {
    const inputRef = useRef(null)
    const inputClick = () => {
        const element: HTMLElement = inputRef.current!
        element.focus()
    }

    const onInput: KeyboardEventHandler = e => {
        const element: HTMLInputElement = inputRef.current!
        const pattern = new RegExp(element.getAttribute("pattern")??"")
        if(!pattern.test(element.value + e.key)) {
            e.preventDefault()
        }
    }

    return (
        <div className="border rounded p-2 my-4 d-flex flex-column" style={{'backgroundColor': 'rgb(247, 248, 250)'}} onClick={inputClick}>
            <div>{(variant == "to")?"To":"From"}</div>
            <div className="d-flex flex-row">
                <input
                    className="form-control no-border bg-transparent flex-shrink-1"
                    style={{'fontSize': '25px', 'fontWeight': "550"}}
                    placeholder="0.0"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    ref={inputRef}
                    onKeyPress={onInput}
                    onChange={e => onChangeAmount(parseFloat(e.target.value))}
                />
                <TokenSelect
                    value={token}
                    availableTokens={availableTokens}
                    tokens={tokens}
                    onChange={token => onChangeToken(token)}
                    onClick={e => e.stopPropagation()}
                />
            </div>
        </div>
    )
}

