
export function calculateHoldingWeight(holding, netAssets) {
  if (holding.value == null || netAssets == null) {
    return null
  }

  const marketValue = Number(holding.value)
  const assets = Number(netAssets)

  if (
    !Number.isFinite(marketValue) ||
    !Number.isFinite(assets) ||
    assets === 0
  ) {
    return null
  }

  return (marketValue / assets) * 100
}

export function aggregateByCategory(
  holdings,
  categoryField,
  netAssets
) {
  const totals = {}

  for (const holding of holdings) {
    const category = holding[categoryField] || 'Unknown'
    const percentage = calculateHoldingWeight(holding, netAssets)

    if (percentage === null) continue

    totals[category] = (totals[category] || 0) + percentage
  }

  return Object.entries(totals)
    .map(([category, percentage]) => ({
      category,
      percentage,
    }))
    .sort((a, b) => b.percentage - a.percentage)
}

export function getTopHoldings(holdings, netAssets) {
  return holdings
    .map((holding) => ({
      name: holding.name || 'Unknown',
      value: Number(holding.value),
      percentage: calculateHoldingWeight(holding, netAssets),
    }))
    .filter(
      (holding) =>
        Number.isFinite(holding.value) &&
        holding.percentage !== null
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
}

export function aggregateByCountry(holdings, netAssets) {
  const countryTotals = {}

  for (const holding of holdings) {
    const country = holding.invCountry || 'Unknown'

    if (holding.value == null) continue

    const marketValue = Number(holding.value)

    if (!Number.isFinite(marketValue)) continue

    countryTotals[country] =
      (countryTotals[country] || 0) + marketValue
  }

  return Object.entries(countryTotals)
    .map(([country, value]) => ({
      country,
      value,
      percentage: calculateHoldingWeight({ value }, netAssets),
    }))
    .filter((country) => country.percentage !== null)
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
}
