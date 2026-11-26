
import CIKSearch from './CIKSearch'

function Header({ onSearch }) {
  return (
    <header className="app-header">
      <div className="container-fluid px-4">
        <div className="row align-items-center g-3 py-3">

          <div className="col-lg-3">
            <div className="brand">
              {/* <div className="brand-icon">
                <span>N</span>
              </div> */}

              <div>
                <div className="brand-name">NPORT Explorer</div>
                <div className="brand-subtitle">
                  SEC Filing Intelligence
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <CIKSearch onSearch={onSearch} />
          </div>

          <div className="col-lg-3 text-lg-end">
            <span className="data-status">
              <span className="status-dot"></span>
              SEC Data
            </span>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
