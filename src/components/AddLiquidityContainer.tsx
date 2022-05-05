import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AddLiquidityHeader from './AddLiquidityHeader'
import TokenInput from './TokenInput'
import { tokenConfig } from 'config/token-config'
import { useState } from 'react'
import { Token } from 'models/token'


export default () => {
    const [tokenA, setTokenA] = useState<Token>()

    return (
        <div className="mx-auto bg-white rounded-4 p-4" style={{maxWidth: '400px'}}>
            <AddLiquidityHeader></AddLiquidityHeader>
            <TokenInput
                label='Input'
                tokens={tokenConfig.tokens}
                token={tokenA}
                onChangeToken={setTokenA}
            ></TokenInput>
        </div>
    )
}