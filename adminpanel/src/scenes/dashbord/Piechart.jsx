import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Product A', INDIA: 4000, CHINA: 2300, USA: 2400 },
  { name: 'Product B', INDIA: 3000, CHINA: 300, USA: 1398 },
  { name: 'Product C', INDIA: 2000, CHINA: 8300, USA: 9800 },
  { name: 'Product D', INDIA: 2780, CHINA: 4300, USA: 3908 },
  { name: 'Product E', INDIA: 1890, CHINA: 2300, USA: 4800 },
  { name: 'Product F', INDIA: 2390, CHINA: 1300, USA: 3800 },
  { name: 'Product G', INDIA: 3490, CHINA: 1300, USA: 4300 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE', '#FF66A3', '#FFAA66'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x} y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="14px"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChart1() {
 return (
    <div className="mb-6">
      <h3 className="text-gray-400 text-xl">Pi‑Chart</h3>
      <h1 className="lg:text-3xl text-lg font-semibold">
        Inflation Chart of Area Sales
      </h1>

      <div style={{ width: '100%', height: 500 /* or use Tailwind h‑[value] */ }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="45%"
              outerRadius="70%"
              paddingAngle={4}
              label={renderCustomizedLabel}
              labelLine={false}
              dataKey="INDIA"
              isAnimationActive
              animationBegin={200}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}