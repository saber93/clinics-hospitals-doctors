
import React from "react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AnalyticsPage = () => {
  // Sample data for charts
  const monthlyUsers = [
    { name: "Jan", users: 400 },
    { name: "Feb", users: 300 },
    { name: "Mar", users: 500 },
    { name: "Apr", users: 280 },
    { name: "May", users: 590 },
    { name: "Jun", users: 390 },
  ];

  const trafficSources = [
    { name: "Direct", value: 400 },
    { name: "Organic Search", value: 300 },
    { name: "Referral", value: 300 },
    { name: "Social Media", value: 200 },
  ];

  const conversionData = [
    { name: "Jan", rate: 0.12 },
    { name: "Feb", rate: 0.19 },
    { name: "Mar", rate: 0.24 },
    { name: "Apr", rate: 0.21 },
    { name: "May", rate: 0.28 },
    { name: "Jun", rate: 0.32 },
  ];

  const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Monthly User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyUsers}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="users"
                fill="#8884d8"
                name="Active Users"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Conversion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={conversionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />
              <Tooltip
                formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, "Conversion Rate"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
                name="Conversion Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {trafficSources.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
