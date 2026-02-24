import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  Line,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
const data = [
  {
    name: 'City A',
    Electronics: 590,
    Cloth: 800,
    Hamper: 1400,
    Others: 490,
  },
  {
    name: 'City B',
    Electronics: 868,
    Cloth: 967,
    Hamper: 1506,
    Others: 590,
  },
  {
    name: 'City C',
    Electronics: 1397,
    Cloth: 1098,
    Hamper: 989,
    Others: 350,
  },
  {
    name: 'City D',
    Electronics: 1480,
    Cloth: 1200,
    Hamper: 1228,
    Others: 480,
  },
  {
    name: 'City E',
    Electronics: 1520,
    Cloth: 1108,
    Hamper: 1100,
    Others: 460,
  },
  {
    name: 'City F',
    Electronics: 1400,
    Cloth: 680,
    Hamper: 1700,
    Others: 380,
  },
];
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      fontSize: '14px'
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>{label}</div>
      {payload.map((item, idx) => (
        <div key={idx} style={{ color: item.color, margin: '2px 0' }}>
          {item.name}: <strong>{item.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
};
const Graph = () => (
  <div className="mb-6 max-w-4xl mx-auto p-4">
    <h3 className="text-gray-400 text-xl">Composed Chart</h3>
    <h1 className="lg:text-3xl text-lg font-semibold mb-4">
      Inflation Chart of Product Sales
    </h1>
    {/* Wrapper with defined height */}
    <div className="w-full h-64 md:h-80 lg:h-96 relative">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
        >
          {/* Grid & Axes */}
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis dataKey="name" />
          <YAxis />

          {/* Tooltip & Legend */}
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" align="right" height={36} />

          {/* Gradient */}
          <defs>
            <linearGradient id="gradHamper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Chart elements */}
          <Area
            type="monotone"
            dataKey="Hamper"
            name="Hamper"
            stroke="#8884d8"
            fill="url(#gradHamper)"
            strokeWidth={2}
            fillOpacity={1}
          />
          <Bar
            dataKey="Cloth"
            name="Cloth"
            barSize={20}
            fill="#413ea0"
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="Electronics"
            name="Electronics"
            stroke="#ff7300"
            strokeWidth={2}
            dot={{ r: 4, fill: '#ff7300' }}
          />
          <Scatter dataKey="Others" name="Count" fill="#e74c3c" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Graph