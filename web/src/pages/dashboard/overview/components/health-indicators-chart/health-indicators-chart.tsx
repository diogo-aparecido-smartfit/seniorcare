"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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

const chartData = [
  { indicator: "Pressão Arterial", value: 85 },
  { indicator: "Frequência Cardíaca", value: 75 },
  { indicator: "Nível de Atividade", value: 65 },
  { indicator: "Qualidade do Sono", value: 70 },
  { indicator: "Hidratação", value: 80 },
  { indicator: "Nutrição", value: 90 },
];

const chartConfig = {
  value: {
    label: "Indicadores de Saúde",
    color: "#4CAF50",
  },
} satisfies ChartConfig;

export function HealthIndicatorsChart() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Indicadores de Saúde</CardTitle>
          <CardDescription>
            Número de eventos críticos detectados pelos sensores ou registros
            manuais.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="indicator" />
            <PolarGrid />
            <Radar dataKey="value" fill="#4CAF50" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Indicadores melhoraram 5.2% este mês{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Dados coletados de Janeiro a Junho de 2025
        </div>
      </CardFooter>
    </Card>
  );
}
