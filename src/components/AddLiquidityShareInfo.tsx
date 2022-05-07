import config from "config"
import useCurrentUser from "hooks/use-current-user"
import usePoolAmounts from "hooks/use-pool-amounts"
import { SwapPair } from "models/swap-pair"
import { Token } from "models/token"

type AddLiquidityShareInfoProps = {
    tokenA: Token,
    tokenB: Token,
    amountA: number
}

export default ({tokenA, tokenB, amountA}: AddLiquidityShareInfoProps) => {
    const user = useCurrentUser()
    const poolAmounts = usePoolAmounts(user.addr, tokenA, tokenB)

    const priceBPerA = poolAmounts?.poolA / poolAmounts?.poolB
    const priceAPerB = 1/priceBPerA
    const poolSharePercent = (amountA / (amountA + poolAmounts?.poolA)) * 100
    const poolShareDescriptor = (poolSharePercent > 0.01) ? poolSharePercent.toFixed(2) : "<0.01%"
    console.log(poolAmounts, amountA, (amountA + poolAmounts?.poolA))

    const labelBPerA = tokenB.ticker + " per " + tokenA.ticker
    const labelAPerB = tokenA.ticker + " per " + tokenB.ticker
    const labelSharePercent = "Share of Pool"

    return (
        <div className="d-flex flex-column">
            <span style={{fontSize: "0.9em"}}>Prices and pool share</span>
            <div className="rounded-3 border bg-light d-flex flex-row mt-2">
                <PoolShareColumn valueText={priceBPerA.toString()} labelText={labelBPerA}></PoolShareColumn>
                <PoolShareColumn valueText={priceAPerB.toString()} labelText={labelAPerB}></PoolShareColumn>
                <PoolShareColumn valueText={poolShareDescriptor} labelText={labelSharePercent}></PoolShareColumn>
            </div>
        </div>
    )
}

const PoolShareColumn = ({
    valueText,
    labelText
}: {
    valueText: string,
    labelText: string
}) => {
    return (
        <div className="d-flex flex-column p-2 text-center col">
            <span style={{fontSize: "0.95em"}}>
                {valueText}
            </span>
            <span style={{fontSize: "0.75em"}}>
                {labelText}
            </span>
        </div>
    )
}