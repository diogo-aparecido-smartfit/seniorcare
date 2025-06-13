"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

interface MedicationsChartProps {
  data: {
    scheduledToday: number;
    administered: number;
    pending: number;
  };
}

export function MedicationsChart({ data }: MedicationsChartProps) {
  const chartData = [
    { name: "Administradas", value: data.administered || 0, color: "#10b981" },
    { name: "Pendentes", value: data.pending || 0, color: "#f59e0b" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medicações Hoje</CardTitle>
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
