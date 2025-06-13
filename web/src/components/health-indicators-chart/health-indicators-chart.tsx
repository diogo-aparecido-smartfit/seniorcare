"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Pressão", normal: 65, atenção: 25, crítico: 10 },
  { name: "Temperatura", normal: 80, atenção: 15, crítico: 5 },
  { name: "Glicemia", normal: 55, atenção: 30, crítico: 15 },
  { name: "Oxigenação", normal: 75, atenção: 20, crítico: 5 },
];

export function HealthIndicatorsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores de Saúde</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="normal" name="Normal" fill="#10b981" />
              <Bar dataKey="atenção" name="Atenção" fill="#f59e0b" />
              <Bar dataKey="crítico" name="Crítico" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
