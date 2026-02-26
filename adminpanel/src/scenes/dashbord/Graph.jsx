import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border text-sm">
      <div className="font-bold mb-1">{label}</div>
      {payload.map((item, idx) => (
        <div key={idx} style={{ color: item.color }} className="my-0.5">
          {item.name}: <strong>{item.value.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
};

const Graph = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic data from backend
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        // Replace with your actual sales/analytics endpoint
        const response = await axios.get('http://localhost:3000/admin/sales-stats');
        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching graph data:", error);
        // Fallback to empty array or mock data if request fails
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []);

  if (loading) return <div className="h-64 flex items-center justify-center">Loading Chart...</div>;

  return (
    <div className="mb-6 max-w-4xl mx-auto p-4">
      <h3 className="text-gray-400 text-xl">Revenue Analytics</h3>
      <h1 className="lg:text-3xl text-lg font-semibold mb-4">
        Live Product Performance
      </h1>
      
      <div className="w-full h-64 md:h-80 lg:h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#e0e0e0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" align="right" height={36} />

            <defs>
              <linearGradient id="gradHamper" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="Hamper"
              name="Hamper"
              stroke="#8884d8"
              fill="url(#gradHamper)"
              strokeWidth={2}
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
            <Scatter dataKey="Others" name="Others" fill="#e74c3c" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;