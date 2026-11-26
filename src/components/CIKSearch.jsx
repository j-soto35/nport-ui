
import { useState } from 'react'

function CIKSearch({ onSearch }) {
  const [cik, setCik] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedCik = cik.trim()

    if (!/^\d{1,10}$/.test(trimmedCik)) {
      return
    }

    onSearch(trimmedCik.padStart(10, '0'))
  }

  return (
    <form className="cik-search" onSubmit={handleSubmit}>
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Search by CIK (e.g. 0001067983)"
          value={cik}
          onChange={(event) => setCik(event.target.value)}
          maxLength={10}
          inputMode="numeric"
        />

        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}

export default CIKSearch
