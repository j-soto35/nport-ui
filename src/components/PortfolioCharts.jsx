
import { useMemo } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

function calculateHoldingWeight(holding, netAssets) {
  const marketValue = Number(holding.value)
  const assets = Number(netAssets)

  if (
    holding.value == null ||
    netAssets == null ||
    !Number.isFinite(marketValue) ||
    !Number.isFinite(assets) ||
    assets === 0
  ) {
    return null
  }

  return (marketValue / assets) * 100
}

function aggregateByCategory(holdings, categoryField, netAssets) {
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

function CompositionChart({ title, data }) {
  return (
    <div className="portfolio-chart-card">
      <h3 className="chart-title">{title}</h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
          />

          <XAxis
            type="number"
            tickFormatter={(value) => `${value.toFixed(1)}%`}
            fontSize={11}
          />

          <YAxis
            type="category"
            dataKey="category"
            width={95}
            fontSize={11}
          />

          <Tooltip
            formatter={(value) => [
              `${Number(value).toFixed(3)}%`,
              'Net Assets',
            ]}
          />

          <Bar
            dataKey="percentage"
            fill="#3478d4"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function PortfolioCharts({ holdings = [], netAssets }) {
  const assetData = useMemo(
    () => aggregateByCategory(holdings, 'assetCat', netAssets),
    [holdings, netAssets]
  )

  const issuerData = useMemo(
    () => aggregateByCategory(holdings, 'issuerCat', netAssets),
    [holdings, netAssets]
  )

  return (
    <div className="portfolio-charts">
      <CompositionChart
        title="Asset Allocation"
        data={assetData}
      />

      <CompositionChart
        title="Issuer Composition"
        data={issuerData}
      />
    </div>
  )
}

export default PortfolioCharts
