import { useState } from 'react'
import Header from './components/Header'
import FundOverview from './components/FundOverview'
import { getNportFiling } from './services/nportService'

function App() {
  const [filing, setFiling] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSearch(cik) {
    setLoading(true)
    setError(null)
    setFiling(null)

    try {
      const data = await getNportFiling(cik)
      setFiling(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-layout">
      <Header onSearch={handleSearch} />

      <main className="app-main">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-secondary">
              Retrieving N-PORT filing...
            </p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <FundOverview filing={filing} />
        )}
      </main>
    </div>
  )
}

export default App