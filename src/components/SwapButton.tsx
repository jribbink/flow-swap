// @ts-ignore
import * as fcl from "@onflow/fcl"
import useCurrentUser from "hooks/use-current-user"
import { Button } from "react-bootstrap"
import ConnectWalletButton from "./ConnectWalletButton"

type SwapButtonProps = {
    className?: string
    styles?: React.CSSProperties,
    disabledText?: string | null
}

export default ({className, styles, disabledText = null}: SwapButtonProps) => {
    const user = useCurrentUser()

    if (user.loggedIn) {
        return (
            <Button
                style={styles}
                className={className + " text-uppercase " + (disabledText ? "border-0 bg-secondary bg-opacity-25" : "")}
                variant={disabledText ? "secondary" : "primary"}
                disabled={!!disabledText}
                onClick={fcl.logIn}
            >
                {disabledText ?? 'Swap'}
            </Button>
        )
    } else {
        return (
            <ConnectWalletButton className={className} styles={styles}></ConnectWalletButton>
        )
    }
}