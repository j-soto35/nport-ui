
import { useMemo } from 'react'
import { AgGridReact, AgGridProvider } from 'ag-grid-react'
import { AllCommunityModule, themeQuartz } from 'ag-grid-community'

const modules = [AllCommunityModule]

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
})

const gridTheme = themeQuartz.withParams({
  backgroundColor: '#FFFFFF',
  foregroundColor: '#202b3c',

  headerBackgroundColor: '#203B5C',
  headerTextColor: '#F5F7FA',

  borderColor: '#E2E8F0',
  accentColor: '#3478d4',

  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: 12,
  spacing: 8,

  headerFontWeight: 600,
  headerFontSize: 12,

  rowHoverColor: '#F0F5FA',
})

function HoldingsGrid({ holdings = [] }) {
  // convert numeric API fields into numbers.
  const rowData = useMemo(
    () =>
      holdings.map((holding) => ({
        ...holding,
        balance: Number(holding.balance),
        value: Number(holding.value),
        pctVal: Number(holding.pctVal),
      })),
    [holdings]
  )

  const columnDefs = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Security',
        minWidth: 220,
        flex: 2,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'cusip',
        headerName: 'CUSIP',
        minWidth: 115,
      },
      {
        field: 'isin',
        headerName: 'ISIN',
        minWidth: 155,
      },
      {
        field: 'lei',
        headerName: 'LEI',
        minWidth: 190,
      },
      {
        field: 'balance',
        headerName: 'Balance',
        minWidth: 130,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) =>
          params.value == null || !Number.isFinite(params.value)
            ? '—'
            : numberFormatter.format(params.value),
      },
      {
        field: 'value',
        headerName: 'Market Value',
        minWidth: 150,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) =>
          params.value == null || !Number.isFinite(params.value)
            ? '—'
            : currencyFormatter.format(params.value),
      },
      {
        field: 'pctVal',
        headerName: '% Net Assets',
        minWidth: 135,
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) =>
          params.value == null || !Number.isFinite(params.value)
            ? '—'
            : `${percentFormatter.format(params.value)}%`,
      },
      {
        field: 'assetCat',
        headerName: 'Asset Category',
        minWidth: 135,
      },
      {
        field: 'issuerCat',
        headerName: 'Issuer Category',
        minWidth: 140,
      },
      {
        field: 'fairValLevel',
        headerName: 'Fair Value Level',
        minWidth: 135,
      },
      {
        field: 'payoffProfile',
        headerName: 'Payoff Profile',
        minWidth: 130,
      },
      {
        field: 'invCountry',
        headerName: 'Country',
        minWidth: 100,
      },
    ],
    []
  )

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    }),
    []
  )

  return (
    <AgGridProvider modules={modules}>
      <div className="holdings-grid">
        <AgGridReact
          theme={gridTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={25}
          paginationPageSizeSelector={[10, 25, 50, 100]}
          animateRows={false}
          suppressCellFocus={true}
          getRowId={(params) =>
            `${params.data.cusip || ''}-${params.data.isin || ''}-${params.data.name || ''}`
          }
        />
      </div>
    </AgGridProvider>
  )
}

export default HoldingsGrid
