import useCurrentUser from "hooks/use-current-user"
import { LiquidityPosition } from "models/liquidity-position"
import Link from "next/link"
import { MouseEventHandler, useState } from "react"
import LiquidityPositionItem from "./LiquidityPositionItem"

type LiquidityPositionListProps = {}

export default ({}: LiquidityPositionListProps) => {

    const liquidityPositions: LiquidityPosition[] = []
    const user = useCurrentUser()

    if(user.loggedIn) {
        if (liquidityPositions.length == 0) {
            return (
                <div className="p-4">
                    You have no active liquidity positions, please <Link href={"/pool/add"}>add a liquidity position</Link> to get started.
                </div>
            )
        }
        return (
        <>
            {liquidityPositions.map(position => (
                <LiquidityPositionItem position={position} />
            ))}
        </>
        )
    } else {
        return (
            <div className="p-4">
                Connect your wallet to view your liquidity
            </div>
        )
    }
}