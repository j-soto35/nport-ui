
import HoldingsGrid from './HoldingsGrid'
import PortfolioCharts from './PortfolioCharts'

function formatCurrency(value) {
  const amount = Number(value)

  if (!Number.isFinite(amount)) return 'N/A'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount)
}

function FundOverview({ filing }) {
  if (!filing) {
    return (
      <div className="empty-state">
        <h2>Welcome to NPORT Explorer</h2>
        <p>
          Enter a CIK above to explore SEC N-PORT filings
          and portfolio holdings.
        </p>
      </div>
    )
  }

  const filingInfo = filing.filing
  const formData = filing.form_data
  const fundInfo = formData.fund_info
  const fundName = formData.gen_info.reg_name
  const holdings = formData.holdings ?? []

  return (
    <div className="dashboard-content">
      {/* Fund heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="section-title">{fundName}</h1>
          <p className="section-subtitle mb-0">
            Form {filingInfo.form} | Report date: {filingInfo.report_date}
          </p>
        </div>

        <span className="cik-badge">CIK: {filing.cik}</span>
      </div>

      {/* Fund financial summary */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="dashboard-card">
            <div className="card-label">Total Assets</div>
            <div className="card-value">
              {formatCurrency(fundInfo.total_assets)}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card">
            <div className="card-label">Total Liabilities</div>
            <div className="card-value">
              {formatCurrency(fundInfo.total_liabilities)}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card">
            <div className="card-label">Net Assets</div>
            <div className="card-value">
              {formatCurrency(fundInfo.net_assets)}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio analysis */}
      <div className="portfolio-layout">
        <section className="holdings-section">
          <div className="holdings-heading">
            <div>
              <h2 className="section-title">Portfolio Holdings</h2>
              <p className="section-subtitle mb-0">
                {holdings.length.toLocaleString()} securities
              </p>
            </div>
          </div>

          <HoldingsGrid holdings={holdings} />
        </section>

        <aside className="portfolio-sidebar">
          <PortfolioCharts 
            holdings={holdings}
            netAssets={fundInfo.net_assets} 
          />
        </aside>
      </div>
    </div>
  )
}

export default FundOverview
