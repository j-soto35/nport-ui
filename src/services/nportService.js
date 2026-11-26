
const API_BASE_URL = 'https://nport-api.fastapicloud.dev'

export async function getNportFiling(cik) {
  // Normalize and validate the CIK
  const normalizedCik = String(cik).trim()

  if (
    normalizedCik.length === 0 ||
    normalizedCik.length > 10 ||
    ![...normalizedCik].every(char => char >= '0' && char <= '9')
  ) {
    throw new Error('Invalid CIK. Please enter 1-10 digits.')
  }

  const formattedCik = normalizedCik.padStart(10, '0')

  // Send request to the backend
  const response = await fetch(
    `${API_BASE_URL}/nport/${formattedCik}`
  )

  // Parse the JSON response
  let data

  try {
    data = await response.json()
  } catch {
    throw new Error(
      `The API returned an invalid response (HTTP ${response.status}).`
    )
  }

  // Handle unsuccessful HTTP responses
  if (!response.ok) {
    const message =
      data?.detail?.message ||
      data?.detail?.error ||
      `API request failed with status ${response.status}.`

    throw new Error(message)
  }

  return data
}
