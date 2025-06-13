"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface CareGiversChartProps {
  data: {
    total: number;
    onDuty: number;
  };
}

export function CareGiversChart({ data }: CareGiversChartProps) {
  const offDuty = Math.max(0, (data.total || 0) - (data.onDuty || 0));

  const chartData = [
    { name: "Em serviço", value: data.onDuty || 0, color: "#3b82f6" },
    { name: "Fora de serviço", value: offDuty, color: "#9ca3af" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuidadores</CardTitle>
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
