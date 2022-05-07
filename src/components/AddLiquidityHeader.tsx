import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default () => {
    return (
        <div className="d-flex justify-content-between align-items-center">
            <span className="col">
                <Link href="/pool">
                    <div className='btn shadow-none' >
                        <div style={{width: '1em', paddingBottom: '0.2em'}}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                    </div>
                </Link>
            </span>
            <span style={{fontSize: "1.2em"}}>Add Liquidity</span>
            <span className="col"></span>
        </div>
    )
}