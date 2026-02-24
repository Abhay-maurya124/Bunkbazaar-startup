import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Optional: a custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="bg-white p-3 rounded-md shadow-md"
      style={{ minWidth: 120 }}
    >
      <p className="font-semibold">{label}</p>
      {payload.map((item, idx) => (
        <p key={idx} style={{ color: item.color }}>
          {item.name}: {item.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const data = [
  {
    name: 'Page A',
    Male: 4000,
    Female: 2400,
    Kids: 2400,
  },
  {
    name: 'Page B',
    Male: 3000,
    Female: 1398,
    Kids: 2210,
  },
  {
    name: 'Page C',
    Male: 2000,
    Female: 9800,
    Kids: 2290,
  },
  {
    name: 'Page D',
    Male: 2780,
    Female: 3908,
    Kids: 2000,
  },
  {
    name: 'Page E',
    Male: 1890,
    Female: 4800,
    Kids: 2181,
  },
  {
    name: 'Page F',
    Male: 2390,
    Female: 3800,
    Kids: 2500,
  },
  {
    name: 'Page G',
    Male: 3490,
    Female: 4300,
    Kids: 2100,
  },
];
const StyledAreaChart = () => (
  <div className="mb-6 max-w-4xl mx-auto">
    <h3 className="text-gray-400 text-xl">Area Chart</h3>
    <h1 className="lg:text-3xl text-lg font-semibold">
      Inflation Chart of Product Sales
    </h1>

    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="MaleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="FemaleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="KidsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />

          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />

          <Tooltip
            content={<CustomTooltip />}
            wrapperStyle={{ outline: 'none' }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingTop: 10 }}
            formatter={(value, entry) => (
              <span className="font-semibold">{value}</span>
            )}
          />

          <Area
            type="monotone"
            dataKey="Male"
            name="Male"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#MaleGradient)"
          />
          <Area
            type="monotone"
            dataKey="Female"
            name="Female"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#FemaleGradient)"
          />
          <Area
            type="monotone"
            dataKey="Kids"
            name="Kids"
            stroke="#ffc658"
            fillOpacity={1}
            fill="url(#KidsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default StyledAreaChart;
