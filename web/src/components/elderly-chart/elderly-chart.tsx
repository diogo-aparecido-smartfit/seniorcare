"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { month: "Janeiro", alerts: 120 },
  { month: "Fevereiro", alerts: 95 },
  { month: "Março", alerts: 150 },
  { month: "Abril", alerts: 130 },
  { month: "Maio", alerts: 170 },
];

const chartConfig = {
  alerts: {
    label: "Alertas",
    color: "#FF5722",
  },
} satisfies ChartConfig;

export function ElderlyChart() {
  return (
    <Card className="flex w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Alertas em Geral</CardTitle>
          <CardDescription>
            Número total de alertas gerados por sensores ou registros manuais.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="alerts" fill="var(--color-alerts)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
