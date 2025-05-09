"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Dados relacionados a medicações por idoso
const chartData = [
  { category: "Manhã", value: 40 },
  { category: "Tarde", value: 30 },
  { category: "Noite", value: 20 },
  { category: "Outros", value: 10 },
];

// Configuração do gráfico com cores hexadecimais
const chartConfig = {
  Manhã: {
    label: "Manhã",
    color: "#4CAF50", // Verde
  },
  Tarde: {
    label: "Tarde",
    color: "#2196F3", // Azul
  },
  Noite: {
    label: "Noite",
    color: "#FFC107", // Amarelo
  },
  Outros: {
    label: "Outros",
    color: "#9E9E9E", // Cinza
  },
} satisfies ChartConfig;

export function MedicationsChart() {
  const totalMedications = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Medicações por Idoso</CardTitle>
          <CardDescription>
            Média de medicamentos tomados por idoso no período.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalMedications}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {chartData.map((entry, i) => (
              <RadialBar
                key={i}
                dataKey="value"
                name={entry.category}
                fill={
                  chartConfig[entry.category as keyof typeof chartConfig].color
                }
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            ))}
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Consumo aumentou 5.2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Dados coletados de Janeiro a Junho de 2025
        </div>
      </CardFooter>
    </Card>
  );
}
