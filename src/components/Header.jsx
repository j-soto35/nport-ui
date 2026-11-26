
import CIKSearch from './CIKSearch'

function Header({ onSearch }) {
  return (
    <header className="app-header">
      <div className="container-fluid px-4">
        <div className="row align-items-center g-3 py-3">

          {/* Brand */}
          <div className="col-lg-3">
            <div className="brand">
              <div className="brand-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="23"
                  height="23"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 3h8l5 5v13H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                  <path d="M14 3v5h5" />
                  <path d="M8 16v-3" />
                  <path d="M12 16v-5" />
                  <path d="M16 16v-7" />
                </svg>
              </div>

              <div>
                <div className="brand-name">NPORT Explorer</div>
                <div className="brand-subtitle">
                  SEC Filing Intelligence
                </div>
              </div>
            </div>
          </div>

          {/* Centered search */}
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="header-search">
              <CIKSearch onSearch={onSearch} />
            </div>
          </div>

          {/* Balances the brand column */}
          <div className="col-lg-3" />

        </div>
      </div>
    </header>
  )
}

export default Header
