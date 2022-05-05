import { LiquidityPosition } from "models/liquidity-position"

type LiquidityPositionProps = {
    position: LiquidityPosition
}

export default ({position}: LiquidityPositionProps) => {
    return (
        <div className="p-4" key={position.poolA + '/' + position.poolB}>
            {position.poolA + '/' + position.poolB + "//TODO SWITCH INTERFACES TO CLASSES"}
        </div>
    )
}