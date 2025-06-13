"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/config/chart.config";

interface RecentAlert {
  month: string;
  count: number;
}

interface OverviewChartProps {
  data: RecentAlert[];
}

const OverviewChart: React.FC<OverviewChartProps> = ({ data }) => {
  const processedData = React.useMemo(() => {
    return data.map((item) => ({
      date: item.month,
      alerts: item.count,
    }));
  }, [data]);

  const total = React.useMemo(
    () => ({
      alerts: processedData.reduce((acc, curr) => acc + curr.alerts, 0),
    }),
    [processedData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Alertas em Geral</CardTitle>
          <CardDescription>
            Número total de alertas gerados por sensores ou registros manuais.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 sm:justify-end sm:border-l sm:py-6">
          <button className="hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm transition-colors bg-accent">
            <div
              className="size-1.5 rounded-full"
              style={{ background: "var(--chart-1)" }}
            />
            <span>Alertas</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.alerts.toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return value;
                  }}
                />
              }
            />
            <Bar
              dataKey="alerts"
              radius={[4, 4, 0, 0]}
              fill="var(--chart-1)"
              className="data-[focus]:fill-[var(--chart-1-active)]"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
