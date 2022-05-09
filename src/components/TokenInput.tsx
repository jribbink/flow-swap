import { useBalance } from "hooks/use-balance"
import useCurrentUser from "hooks/use-current-user"
import { Token } from "models/token"
import { ChangeEventHandler, KeyboardEventHandler, useEffect, useRef, useState } from "react"
import TokenSelect from "./TokenSelect"

const noop = (...args: any[]) => {}

type TokenInputProps = {
    label: string
    availableTokens?: Token[]
    amount?: number
    token?: Token
    tokens: Token[]
    onChangeToken?: (token: Token) => void
    onChangeAmount?: (amount: number) => void
}

export default ({
    label,
    availableTokens,
    amount,
    token,
    tokens,
    onChangeToken = noop,
    onChangeAmount = noop,
}: TokenInputProps) => {
    // needs independent string input state in order to retain decimal places that would not be retained in floating point
    const [value, setValue] = useState<string>("")
    const [lastValue, setLastValue] = useState<string>(value)
    const user = useCurrentUser()
    const balance = useBalance(token ?? "", user.addr)

    // sync value string with numerical amount
    useEffect(() => {
        if((parseFloat(value) || 0) != amount) {
            if (amount) {
                setValue(amount.toString())
            } else {
                setValue("")
            }
        }
    }, [amount])

    // sync numerical amount with value string
    useEffect(() => onChangeAmount(parseFloat(value.replace(',', '.')) || 0), [value])

    const inputRef = useRef(null)
    const inputClick = () => {
        const element: HTMLElement = inputRef.current!
        element.focus()
    }

    const onChangeValue: ChangeEventHandler<HTMLInputElement> = e => {
        const element: HTMLInputElement = inputRef.current!
        const pattern = new RegExp(element.getAttribute("pattern") ?? "")
        const newValue = e.target.value

        if(!pattern.test(newValue)) {
            setValue(lastValue)
        } else {
            setValue(newValue)
            setLastValue(newValue)
        }
    }

    return (
        <div className="border bg-light rounded p-2 my-4 d-flex flex-column" onClick={inputClick}>
            <div className="d-flex flex-row align-content-center">
                <div>{label}</div>
                {
                    user.loggedIn && token ? (
                        <div className="ms-auto" style={{opacity: 0.5, fontSize: '0.9em'}}>
                            {`Balance: ${balance}`}
                        </div>
                    ) : null
                }
            </div>
            <div className="d-flex flex-row">
                <input
                    value={value}
                    className="form-control no-border bg-transparent flex-shrink-1"
                    style={{'fontSize': '25px', 'fontWeight': "550"}}
                    placeholder="0.0"
                    pattern="^[0-9]*[.,]?[0-9]{0,8}$"
                    ref={inputRef}
                    onChange={onChangeValue}
                />
                <TokenSelect
                    value={token}
                    tokens={tokens}
                    onChange={token => onChangeToken(token)}
                    onClick={e => e.stopPropagation()}
                />
            </div>
        </div>
    )
}

