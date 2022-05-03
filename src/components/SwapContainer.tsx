import { tokenConfig } from "config/token-config"
import useCurrentUser from "hooks/use-current-user"
import { useEffect, useState } from "react"
import ConnectWalletButton from "./ConnectWalletButton"
import SwapButton from "./SwapButton"
import TokenInput from "./TokenInput"

export default () => {
    const [disabledText, setDisabledText] = useState(null as string | null)

    const user = useCurrentUser()

    const buttonClassName = "w-100 p-3 rounded-4"
    const buttonStyles = {fontSize: '20px'}

    useEffect(() => {

    })

    return (
        <div className="bg-white mx-auto rounded-4 p-4 shadow" style={{maxWidth: '400px'}}>
            <div style={{'fontSize': '18px', 'fontWeight': '550'}}>Swap</div>
            <TokenInput
                variant="from"
                availableTokens={tokenConfig.tokens}
                tokens={tokenConfig.tokens}
                defaultToken={tokenConfig.tokens[0]}
            />
            <TokenInput
                variant="to"
                availableTokens={tokenConfig.tokens}
                tokens={tokenConfig.tokens}
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