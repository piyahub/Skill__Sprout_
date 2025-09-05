import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PricingChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 p-4 rounded-xl shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          <p className="text-gray-300">
            Avg Salary: <span className="font-bold text-white">${payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#D1D5DB"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#D1D5DB" 
            fontSize={12}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="salary" 
            stroke="#FFFFFF" 
            strokeWidth={4}
            dot={{ fill: '#FFFFFF', strokeWidth: 3, r: 8 }}
            activeDot={{ r: 10, stroke: '#FFFFFF', strokeWidth: 3, fill: '#374151' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PricingChart;