// @ts-ignore
import * as fcl from "@onflow/fcl"
import useCurrentUser from 'hooks/use-current-user'
import { MouseEventHandler } from "react"
import { Button } from "react-bootstrap"
import ConnectWalletButton from "./ConnectWalletButton"

type SwapButtonProps = {
    text: string,
    className?: string
    styles?: React.CSSProperties,
    disabledText?: string | null,
    onClick?: MouseEventHandler
}

export default ({text, className, styles, disabledText = null, onClick}: SwapButtonProps) => {
    const user = useCurrentUser()

    const buttonStyles = {
        ...styles,
        fontSize: '20px'
    }

    const buttonClasses = "w-100 p-3 rounded-4 " + className

    if (user.loggedIn) {
        return (
            <Button
                style={buttonStyles}
                className={buttonClasses + " text-uppercase " + (disabledText ? "border-0 bg-secondary bg-opacity-25" : "")}
                variant={disabledText ? "secondary" : "primary"}
                disabled={!!disabledText}
                onClick={onClick}
            >
                {disabledText ?? text}
            </Button>
        )
    } else {
        return (
            <ConnectWalletButton className={buttonClasses} styles={buttonStyles}></ConnectWalletButton>
        )
    }
}