
import { useMemo } from 'react'
import PortfolioCarousel from './PortfolioCarousel'

import {
  aggregateByCategory,
  getTopHoldings,
  aggregateByCountry,
} from '../../utils/portfolioCalculations'

function PortfolioAnalytics({ holdings = [], netAssets }) {

  console.log(
    'Fair value levels:',
    holdings.map((holding) => holding.fairValLevel)
  )

  const assetData = useMemo(
    () => aggregateByCategory(holdings, 'assetCat', netAssets),
    [holdings, netAssets]
  )

  const issuerData = useMemo(
    () => aggregateByCategory(holdings, 'issuerCat', netAssets),
    [holdings, netAssets]
  )

  const topHoldingsData = useMemo(
    () => getTopHoldings(holdings, netAssets),
    [holdings, netAssets]
  )

  const geographicData = useMemo(
    () => aggregateByCountry(holdings, netAssets),
    [holdings, netAssets]
  )

  const longShortData = useMemo(
  () => aggregateByCategory(holdings, 'payoffProfile', netAssets),
  [holdings, netAssets]
)

  const fairValueData = useMemo(
    () => aggregateByCategory(holdings, 'fairValLevel', netAssets),
    [holdings, netAssets]
  )

  console.log('Fair value chart data:', fairValueData)

  return (
    <PortfolioCarousel
      assetData={assetData}
      issuerData={issuerData}
      topHoldingsData={topHoldingsData}
      geographicData={geographicData}
      longShortData={longShortData}
      fairValueData={fairValueData}
    />
  )
}

export default PortfolioAnalytics
