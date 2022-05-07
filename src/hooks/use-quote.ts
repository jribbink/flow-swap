const cadence = `
import FlowSwapPair from 0xd9854329b7edf136
import FusdUsdtSwapPair from 0x3502a5dacaf350bb

pub fun main(amount: UFix64): [UFix64] {
  let quote0 = FlowSwapPair.quoteSwapExactToken1ForToken2(amount: amount * (1.0 - FlowSwapPair.getFeePercentage()))
  let quote = FusdUsdtSwapPair.quoteSwapExactToken2ForToken1(amount: quote0 * (1.0 - FusdUsdtSwapPair.getFeePercentage()))
  let poolAmounts0 = FlowSwapPair.getPoolAmounts()
  let currentPrice = (poolAmounts0.token2Amount / poolAmounts0.token1Amount) * (1.0 - FlowSwapPair.getFeePercentage())

  return [quote, currentPrice]
}`

export default () => {
    
}