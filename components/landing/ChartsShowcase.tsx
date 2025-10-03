"use client";
import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const matchData = [
  { name: "1", attacks: 4, defense: 3 },
  { name: "2", attacks: 6, defense: 4 },
  { name: "3", attacks: 5, defense: 6 },
  { name: "4", attacks: 8, defense: 5 },
  { name: "5", attacks: 7, defense: 6 },
];

export const ChartsShowcase: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">Charts showcase</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-card rounded-lg h-64">
            <h4 className="text-sm font-medium mb-2">Match activity</h4>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={matchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attacks"
                  stroke="var(--chart-1)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="defense"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-card rounded-lg h-64">
            <h4 className="text-sm font-medium mb-2">Readiness trend</h4>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={matchData}>
                <defs>
                  <linearGradient
                    id="colorReadiness"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-3)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="defense"
                  stroke="var(--chart-3)"
                  fill="url(#colorReadiness)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
