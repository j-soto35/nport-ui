
import { useState, useRef, useEffect } from 'react'
import suggestedCiks from '../data/suggestedCiks'

function CIKSearch({ onSearch }) {
  const [cik, setCik] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef(null)

  const filteredSuggestions = suggestedCiks.filter((fund) =>
    fund.cik.includes(cik.trim())
  )

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedCik = cik.trim()

    if (!/^\d{1,10}$/.test(trimmedCik)) {
      return
    }

    onSearch(trimmedCik.padStart(10, '0'))
    setShowSuggestions(false)
  }

  function handleSelect(fund) {
    setCik(fund.cik)
    setShowSuggestions(false)
  }

  return (
    <div className="cik-search-container" ref={searchRef}>
      <form className="cik-search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by CIK..."
            value={cik}
            onChange={(event) => {
              setCik(event.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            maxLength={10}
            inputMode="numeric"
            autoComplete="off"
          />

          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="popular-funds-dropdown">
          <div className="suggestions-header">
            <span>Suggested CIKs</span>
            <span className="suggestions-header-hint">
              or manually enter any CIK
            </span>
          </div>

          {filteredSuggestions.map((fund) => (
            <button
              key={fund.cik}
              type="button"
              className="popular-fund-item"
              onClick={() => handleSelect(fund)}
            >
              <span className="popular-fund-name">
                {fund.name}
              </span>

              <span className="popular-fund-cik">
                {fund.cik}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CIKSearch
