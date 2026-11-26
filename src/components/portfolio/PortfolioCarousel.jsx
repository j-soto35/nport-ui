
import { useState } from 'react'
import CompositionChart from './charts/CompositionChart'
import TopHoldingsChart from './charts/TopHoldingsChart'
import GeographicExposureChart from './charts/GeographicExposureChart'

const slides = [
  {
    title: 'Portfolio Composition',
    description: 'Breakdown by asset and issuer classification',
  },
  {
    title: 'Largest Holdings',
    description: 'Top 10 positions ranked by market value',
  },
  {
    title: 'Geographic Exposure',
    description: 'Top 10 investment countries by market value',
  },
  {
    title: 'Long vs. Short Exposure',
    description: 'Breakdown by reported payoff profile',
  },
  {
    title: 'Fair Value Hierarchy',
    description: 'Breakdown by reported fair value level',
  },
]

function PortfolioCarousel({
  assetData,
  issuerData,
  topHoldingsData,
  geographicData,
  longShortData,
  fairValueData
}) {
  const [activeSlide, setActiveSlide] = useState(0)

  function showPrevious() {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    )
  }

  function showNext() {
    setActiveSlide(
      (current) => (current + 1) % slides.length
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
            {String(activeSlide + 1).padStart(2, '0')} /{' '}
            {String(slides.length).padStart(2, '0')}
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
          <TopHoldingsChart data={topHoldingsData} />
        )}

        {activeSlide === 2 && (
          <GeographicExposureChart data={geographicData} />
        )}

        {activeSlide === 3 && (
          <CompositionChart
            title="Long vs. Short Exposure"
            data={longShortData}
          />
        )}

        {activeSlide === 4 && (
          <CompositionChart
            title="Fair Value Hierarchy"
            data={fairValueData}
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

export default PortfolioCarousel
