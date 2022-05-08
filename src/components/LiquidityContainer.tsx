import config from "config"
import { Token } from "models/token"
import Link from "next/link"
import LiquidityPositionList from "./LiquidityPositionList"


export default () => {
    const addLiquidityUrl = Token.generateAddLiquidityUrl(config.pairs[0].tokenA, config.pairs[0].tokenB)

    return (
        <div className="mx-auto" style={{maxWidth: '500px'}}>
            <div className="d-flex flex-row align-items-end px-2">
                <span className="fw-bold">Your Liquidity Positions</span>
                <Link href={addLiquidityUrl}>
                    <button className="btn btn-success shadow-none py-1 px-2 ms-auto">Add +</button>
                </Link>
            </div>
            <div className="bg-white rounded-4 shadow mt-4">
                <LiquidityPositionList />
            </div>
        </div>
    )
}