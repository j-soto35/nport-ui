
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

function CompositionChart({ title, data, logScale = false }) {
  return (
    <div className="portfolio-chart-card">
      <h3 className="chart-title">{title}</h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
          />

          <XAxis
            type="number"
            domain={[0, 'auto']}
            tickFormatter={(value) => `${value.toFixed(1)}%`}
            fontSize={11}
          />

          <YAxis
            type="category"
            dataKey="category"
            width={95}
            fontSize={11}
          />

          <Tooltip
            formatter={(value) => [
              `${Number(value).toFixed(3)}%`,
              'Net Assets',
            ]}
          />

          <Bar
            dataKey="percentage"
            fill="#3478d4"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CompositionChart
