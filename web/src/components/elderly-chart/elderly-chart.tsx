"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface ElderlyChartProps {
  data: {
    total: number;
    byHealthStatus: {
      stable: number;
      critical: number;
      improving: number;
      declining: number;
    };
  };
}

export function ElderlyChart({ data }: ElderlyChartProps) {
  const chartData = [
    {
      name: "Estável",
      value: data.byHealthStatus?.stable || 0,
      color: "#10b981",
    },
    {
      name: "Crítico",
      value: data.byHealthStatus?.critical || 0,
      color: "#ef4444",
    },
    {
      name: "Melhorando",
      value: data.byHealthStatus?.improving || 0,
      color: "#3b82f6",
    },
    {
      name: "Piorando",
      value: data.byHealthStatus?.declining || 0,
      color: "#eab308",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado dos Idosos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={1}
                dataKey="value"
                nameKey="name"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
