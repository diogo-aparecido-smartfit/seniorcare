"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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

// Dados relacionados ao sistema de cuidadores de idosos
const chartData = [
  { category: "Cuidadores Ativos", value: 150, fill: "#4CAF50" }, // Verde
  { category: "Cuidadores Disponíveis", value: 50, fill: "#2196F3" }, // Azul
  { category: "Cuidadores Ocupados", value: 80, fill: "#FFC107" }, // Amarelo
  { category: "Cuidadores de Folga", value: 20, fill: "#F44336" }, // Vermelho
  { category: "Outros", value: 10, fill: "#9E9E9E" }, // Cinza
];

// Configuração do gráfico com cores hexadecimais
const chartConfig = {
  value: {
    label: "Quantidade",
  },
  "Cuidadores Ativos": {
    label: "Cuidadores Ativos",
    color: "#4CAF50", // Verde
  },
  "Cuidadores Disponíveis": {
    label: "Cuidadores Disponíveis",
    color: "#2196F3", // Azul
  },
  "Cuidadores Ocupados": {
    label: "Cuidadores Ocupados",
    color: "#FFC107", // Amarelo
  },
  "Cuidadores de Folga": {
    label: "Cuidadores de Folga",
    color: "#F44336", // Vermelho
  },
  Outros: {
    label: "Outros",
    color: "#9E9E9E", // Cinza
  },
} satisfies ChartConfig;

export function CareGiversChart() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Status dos Cuidadores</CardTitle>
          <CardDescription>
            Número de cuidadores registrados na plataforma (cuidadores
            disponíveis, indisponíveis, férias...)
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Crescimento de 5.2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Exibindo o status total dos cuidadores nos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
