import useCurrentUser from "hooks/use-current-user"
import Link from "next/link"
import { MouseEventHandler, useState } from "react"
import AddLiquidityContainer from "./AddLiquidityContainer"
import LiquidityPositionList from "./LiquidityPositionList"


export default () => {
    const [showAddLiquidity, setShowAddLiquidity] = useState(false)
    const user = useCurrentUser()

    const handleAddLiquidityClick: MouseEventHandler = e => {
        setShowAddLiquidity(true)
        console.log("HELLo")
    }

    if(showAddLiquidity) {
        return (
            <AddLiquidityContainer />
        )
    } else {
        return (
            <div className="mx-auto" style={{maxWidth: '500px'}}>
                <div className="d-flex flex-row align-items-end">
                    <span className="fw-bold">Your Liquidity</span>
                    <Link href={"/pool/add"}>
                        <button className="btn btn-success border-0 py-1 px-2 ms-auto">Add +</button>
                    </Link>
                </div>
                <div className="bg-white rounded-4 shadow mt-4">
                    <LiquidityPositionList />
                </div>
            </div>
        )
    }
}