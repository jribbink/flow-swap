import config from "config"
import useCurrentUser from "hooks/use-current-user"
import usePoolAmounts from "hooks/use-pool-amounts"
import { SwapPair } from "models/swap-pair"
import { Token } from "models/token"
import { quoteMarketValue } from "util/quote"
import { numberToPercent, round } from "util/util"

type AddLiquidityShareInfoProps = {
    tokenA: Token,
    tokenB: Token,
    amountA: number
}

export default ({tokenA, tokenB, amountA}: AddLiquidityShareInfoProps) => {
    const poolAmounts = usePoolAmounts(tokenA, tokenB)

    const priceBPerA = quoteMarketValue(1, poolAmounts, tokenB, tokenA)
    const priceAPerB = quoteMarketValue(1, poolAmounts, tokenA, tokenB)
    const poolShare = amountA / (amountA + poolAmounts[tokenA.uri])

    const labelBPerA = tokenB.ticker + " per " + tokenA.ticker
    const labelAPerB = tokenA.ticker + " per " + tokenB.ticker
    const labelSharePercent = "Share of Pool"

    return (
        <div className="d-flex flex-column">
            <span style={{fontSize: "0.9em"}}>Prices and pool share</span>
            <div className="rounded-3 border bg-light d-flex flex-row mt-2">
                <PoolShareColumn valueText={round(priceBPerA, 8).toString()} labelText={labelBPerA}></PoolShareColumn>
                <PoolShareColumn valueText={round(priceAPerB, 8).toString()} labelText={labelAPerB}></PoolShareColumn>
                <PoolShareColumn valueText={numberToPercent(poolShare)} labelText={labelSharePercent}></PoolShareColumn>
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