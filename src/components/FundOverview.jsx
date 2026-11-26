
function FundOverview({ cik }) {
  if (!cik) {
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

  return (
    <div className="dashboard-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="section-title">Fund Overview</h1>
          <p className="section-subtitle">
            SEC registrant information
          </p>
        </div>

        <span className="cik-badge">
          CIK: {cik}
        </span>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="dashboard-card">
            <div className="card-label">CIK</div>
            <div className="card-value">{cik}</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card">
            <div className="card-label">Fund Name</div>
            <div className="card-value">Pending API integration</div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card">
            <div className="card-label">Latest Filing</div>
            <div className="card-value">Pending API integration</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FundOverview
