import DatePicker from "./components/date-picker/date-picker";
import { DataCard } from "@/components/data-card/data-card";
import OverviewChart from "./components/overview-chart/overview-chart";
import { ElderlyChart } from "./components/elderly-chart/elderly-chart";
import { CareGiversChart } from "./components/caregivers-chart/caregivers-chart";
import { HealthIndicatorsChart } from "./components/health-indicators-chart/health-indicators-chart";
import { MedicationsChart } from "./components/medications-chart/medications-chart";

export default function OverviewPage() {
  return (
    <section className="flex flex-col p-7 gap-7">
      <DatePicker />
      <div className="flex flex-col xl:flex-row  gap-4">
        <DataCard label="Cuidadores" percentage={11.01} quantity={721} />
        <DataCard label="Medicações do dia" percentage={-0.03} quantity={120} />
        <DataCard label="Agendamentos" percentage={15.03} quantity={1156} />
        <DataCard label="Total de idosos" percentage={6.08} quantity={239000} />
      </div>
      <OverviewChart />
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
        <ElderlyChart />
        <HealthIndicatorsChart />
        <MedicationsChart />
        <CareGiversChart />
      </div>
    </section>
  );
}
