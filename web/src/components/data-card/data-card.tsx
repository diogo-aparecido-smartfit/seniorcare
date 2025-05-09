import { formatQuantity } from "@/utils/utils";
import { SlGraph } from "react-icons/sl";

interface DataCardProps {
  label: string;
  quantity: number;
  percentage: number;
}

export const DataCard = ({ label, percentage, quantity }: DataCardProps) => {
  return (
    <div className="border-[1px] flex flex-col p-6 rounded-xl gap-4 w-full">
      <p className="text-xl font-semibold text-black">{label}</p>
      <div className="flex flex-row items-center justify-between mt-auto">
        <p className="text-4xl font-semibold text-black">
          {formatQuantity(quantity)}
        </p>
        <span className="flex flex-row items-center gap-2">
          <p className="text-base font-normal text-black">{percentage}%</p>
          <SlGraph size={16} />
        </span>
      </div>
    </div>
  );
};
