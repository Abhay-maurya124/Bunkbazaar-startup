import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { name: 'Product A', INDIA: 4000, CHINA: 2300, USA: 2400 },
  { name: 'Product B', INDIA: 3000, CHINA: 300, USA: 1398 },
  { name: 'Product C', INDIA: 2000, CHINA: 8300, USA: 9800 },
  { name: 'Product D', INDIA: 2780, CHINA: 4300, USA: 3908 },
  { name: 'Product E', INDIA: 1890, CHINA: 2300, USA: 4800 },
  { name: 'Product F', INDIA: 2390, CHINA: 1300, USA: 3800 },
  { name: 'Product G', INDIA: 3490, CHINA: 1300, USA: 4300 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border shadow rounded p-2 text-sm font-sans">
      <p className="font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.stroke }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

const LineChart1 = () => (
  <div className="lg:h-full  lg:w-full overflow-hidden font-sans">
    <div className="mb-6">
      <h3 className="text-gray-400 text-xl">Line‑Chart</h3>
      <h1 className="lg:text-3xl text-lg font-semibold">Inflation Chart of Product Sales</h1>
    </div>
    <div className="h-[300px] w-[340px] overflow-x-hidden lg:h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="name"
            style={{ fontSize: '0.875rem', fill: '#4b5563' }}
            tickLine={false}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            yAxisId="left"
            style={{ fontSize: '0.875rem', fill: '#4b5563' }}
            tickLine={false}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            style={{ fontSize: '0.875rem', fill: '#4b5563' }}
            tickLine={false}
            axisLine={{ stroke: '#9ca3af' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ fontSize: '0.875rem', color: '#374151' }}
            formatter={(value) => <span className="uppercase">{value}</span>}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="USA"
            name="USA"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 5, fill: '#8884d8' }}
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="INDIA"
            name="India"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 5, fill: '#82ca9d' }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="CHINA"
            name="China"
            stroke="#32cb4f"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default LineChart1
