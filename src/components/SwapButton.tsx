// @ts-ignore
import * as fcl from "@onflow/fcl"
import { useState } from "react"
import { Button } from "react-bootstrap"

type SwapButtonProps = {
    className?: string
    styles?: React.CSSProperties
}

export default ({className, styles}: SwapButtonProps) => {
    const [buttonDisabled, setButtonDisabled] = useState(() => true)

    return (
        <Button
            style={styles}
            className={className + " text-uppercase " + (buttonDisabled ? "border-0 bg-secondary bg-opacity-25" : "")}
            variant={buttonDisabled ? "secondary" : "primary"}
            disabled={buttonDisabled}
            onClick={fcl.logIn}
        >
            {}
        </Button>
    )
}