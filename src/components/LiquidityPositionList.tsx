import useCurrentUser from "hooks/use-current-user"
import { LiquidityPosition } from "models/liquidity-position"
import Link from "next/link"
import { useRouter } from "next/router"
import { MouseEventHandler, useState } from "react"
import LiquidityPositionItem from "./LiquidityPositionItem"

type LiquidityPositionListProps = {}

export default ({}: LiquidityPositionListProps) => {
    const liquidityPositions: LiquidityPosition[] = []
    const user = useCurrentUser()
    const router = useRouter()

    const handleAddLiquidityLink: MouseEventHandler = e => {
        router.push((e.target as HTMLLinkElement).href)
        e.preventDefault()
    }

    if(user.loggedIn) {
        if (liquidityPositions.length == 0) {
            return (
                <div className="p-4">
                    You have no active liquidity positions, please <a href="/pool/add" className="text-decoration-none" onClick={handleAddLiquidityLink}>add a liquidity position</a> to get started.
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