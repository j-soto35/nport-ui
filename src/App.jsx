
import { useState } from 'react'
import Header from './components/Header'
import FundOverview from './components/FundOverview'

function App() {
  const [selectedCik, setSelectedCik] = useState(null)

  return (
    <>
      <Header onSearch={setSelectedCik} />

      <main className="container-fluid px-4 py-4">
        <FundOverview cik={selectedCik} />
      </main>
    </>
  )
}

export default App
