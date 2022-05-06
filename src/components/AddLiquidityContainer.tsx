import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import AddLiquidityHeader from './AddLiquidityHeader'
import TokenInput from './TokenInput'
import config from 'config'
import { useState } from 'react'
import { Token } from 'models/token'


export default () => {
    const [tokenA, setTokenA] = useState<Token>()
    const [tokenB, setTokenB] = useState<Token>()

    const [amountA, setAmountA] = useState<number>()
    const [amountB, setAmountB] = useState<number>()

    return (
        <div className="mx-auto bg-white rounded-4 p-4" style={{maxWidth: '400px'}}>
            <AddLiquidityHeader></AddLiquidityHeader>
            <TokenInput
                label='Input'
                tokens={config.tokens}
                token={tokenA}
                amount={amountA}
                onChangeToken={setTokenA}
            ></TokenInput>
            <TokenInput
                label='Input'
                tokens={config.tokens}
                token={tokenB}
                amount={amountB}
                onChangeToken={setTokenB}
            ></TokenInput>
        </div>
    )
}