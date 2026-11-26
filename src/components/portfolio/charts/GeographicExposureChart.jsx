
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

function GeographicExposureChart({ data }) {
  return (
    <div className="portfolio-chart-card top-holdings-card">
      <h3 className="chart-title">
        Geographic Exposure
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
            dataKey="country"
            width={75}
            fontSize={11}
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

export default GeographicExposureChart
