import { exists } from "fs"
import { Token } from "models/token"
import { KeyboardEventHandler, useRef, useState } from "react"
import TokenSelect from "./TokenSelect"

type TokenInputProps = {
    variant: "to" | "from"
    availableTokens?: Token[]
    tokens: Token[]
    defaultToken?: Token
    onChangeToken?: (token: Token) => void
}

export default ({variant, availableTokens, tokens, defaultToken}: TokenInputProps) => {
    const [type, setType] = useState(() => defaultToken)

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
                />
                <TokenSelect
                    defaultToken={defaultToken}
                    availableTokens={availableTokens}
                    tokens={tokens}
                    onChange={token => setType(token)}
                    onClick={e => e.stopPropagation()}
                />
            </div>
        </div>
    )
}

