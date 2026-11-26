
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

function TopHoldingsChart({ data }) {
  return (
    <div className="portfolio-chart-card top-holdings-card">
      <h3 className="chart-title">
        Top 10 Holdings by Market Value
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 25, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
          />

          <XAxis
            type="number"
            tickFormatter={(value) =>
              `$${(value / 1000000).toFixed(0)}M`
            }
            fontSize={11}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={125}
            fontSize={10}
          />

          <Tooltip
            formatter={(value, name, props) => [
              `$${Number(value).toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })} (${props.payload.percentage.toFixed(3)}%)`,
              'Market Value',
            ]}
          />

          <Bar
            dataKey="value"
            fill="#3478d4"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TopHoldingsChart
