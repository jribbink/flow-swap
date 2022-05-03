// @ts-ignore
import * as fcl from "@onflow/fcl"
import { Button } from "react-bootstrap"

type ConnectWalletButtonProps = {
    className?: string
    styles?: React.CSSProperties
}

export default ({className, styles}: ConnectWalletButtonProps) => {
    return (
        <Button style={styles} className={className + " text-uppercase"} onClick={fcl.logIn} variant="success">Connect Wallet</Button>
    )
}