// @ts-ignore
import * as fcl from "@onflow/fcl"
import { useState } from "react"
import { Button } from "react-bootstrap"

type SwapButtonProps = {
    className?: string
    styles?: React.CSSProperties,
    disabledText?: string | null
}

export default ({className, styles, disabledText = null}: SwapButtonProps) => {
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
}