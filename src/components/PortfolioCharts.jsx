
import { useMemo, useState } from 'react'
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
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />

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

function TopHoldingsChart({ holdings, netAssets }) {
  const data = useMemo(() => {
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
      // .reverse()
  }, [holdings, netAssets])

  return (
    <div className="portfolio-chart-card top-holdings-card">
      <h3 className="chart-title">Top 10 Holdings by Market Value</h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 25, bottom: 5, left: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />

          <XAxis
            type="number"
            tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
            fontSize={11}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={125}
            fontSize={10}
          />

          <Tooltip
            formatter={(value, name, props) => [
              `$${Number(value).toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })} (${props.payload.percentage.toFixed(3)}%)`,
              'Market Value',
            ]}
          />

          <Bar
            dataKey="value"
            fill="#3478d4"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function PortfolioCharts({ holdings = [], netAssets }) {
  const [activeSlide, setActiveSlide] = useState(0)

  const assetData = useMemo(
    () => aggregateByCategory(holdings, 'assetCat', netAssets),
    [holdings, netAssets]
  )

  const issuerData = useMemo(
    () => aggregateByCategory(holdings, 'issuerCat', netAssets),
    [holdings, netAssets]
  )

  const slides = [
    {
      title: 'Portfolio Composition',
      description: 'Breakdown by asset and issuer classification',
    },
    {
      title: 'Largest Holdings',
      description: 'Top 10 positions ranked by market value',
    },
  ]

  function showPrevious() {
    setActiveSlide((current) =>
      (current - 1 + slides.length) % slides.length
    )
  }

  function showNext() {
    setActiveSlide((current) =>
      (current + 1) % slides.length
    )
  }

  return (
    <div className="portfolio-carousel">
      <div className="portfolio-carousel-header">
        <div>
          <h2 className="section-title">Portfolio Analytics</h2>
          <p className="section-subtitle mb-0">
            {slides[activeSlide].description}
          </p>
        </div>

        <div className="carousel-controls">
          <button
            className="carousel-arrow"
            onClick={showPrevious}
            aria-label="Previous chart"
          >
            &#8249;
          </button>

          <span className="carousel-count">
            {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>

          <button
            className="carousel-arrow"
            onClick={showNext}
            aria-label="Next chart"
          >
            &#8250;
          </button>
        </div>
      </div>

      <div className="portfolio-carousel-content">
        {activeSlide === 0 && (
          <div className="composition-slide">
            <CompositionChart
              title="Asset Allocation"
              data={assetData}
            />

            <CompositionChart
              title="Issuer Composition"
              data={issuerData}
            />
          </div>
        )}

        {activeSlide === 1 && (
          <TopHoldingsChart
            holdings={holdings}
            netAssets={netAssets}
          />
        )}
      </div>

      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            className={`carousel-indicator ${
              activeSlide === index ? 'active' : ''
            }`}
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div>
    </div>
  )
}

export default PortfolioCharts
