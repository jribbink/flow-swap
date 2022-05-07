import { Token } from "models/token"

type AddLiquidityShareInfoProps = {
    tokenA: Token,
    tokenB: Token
}

export default ({tokenA, tokenB}: AddLiquidityShareInfoProps) => {
    const priceBPerA = 5
    const priceAPerB = 1/priceBPerA
    const poolSharePercent = "1.2%"

    const labelBPerA = tokenB.ticker + " per " + tokenA.ticker
    const labelAPerB = tokenA.ticker + " per " + tokenB.ticker
    const labelSharePercent = "Share of Pool"

    return (
        <div className="d-flex flex-column">
            <span style={{fontSize: "0.8em"}}>Prices and pool share</span>
            <div className="rounded-3 border bg-light d-flex flex-row mt-2">
                <PoolShareColumn valueText={priceBPerA.toString()} labelText={labelBPerA}></PoolShareColumn>
                <PoolShareColumn valueText={priceAPerB.toString()} labelText={labelAPerB}></PoolShareColumn>
                <PoolShareColumn valueText={poolSharePercent} labelText={labelSharePercent}></PoolShareColumn>
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