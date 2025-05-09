"use client";

import { Calendar } from "@/components/ui/calendar";
import { Clock, Video } from "lucide-react";
import { useState } from "react";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeFirstLetter } from "@/utils/utils";
import SchedulesDatePicker from "@/components/schedules-date-picker/schedules-date-picker";

export default function SchedulesPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const today = new Date();
  const formattedDay = format(today, "EEEE, dd/MM", { locale: ptBR });
  const formattedToday = isToday(today)
    ? `Hoje, ${format(today, "dd/MM", { locale: ptBR })}`
    : format(today, "EEEE, dd/MM", { locale: ptBR });

  return (
    <section className="flex flex-row w-full h-full justify-between p-12">
      <div className="flex flex-col gap-4 xl:gap-12 w-full">
        <h1 className="hidden xl:flex text-4xl font-bold text-black">
          {formattedToday}
        </h1>
        <span className="flex xl:hidden">
          <SchedulesDatePicker />
        </span>
        <ul className="flex flex-col gap-6 w-full xl:w-fit px-3 xl:px-0">
          <li className="flex flex-col border-b-[1px] py-10">
            <p className="text-gray-500 font-bold text-base">
              {capitalizeFirstLetter(formattedDay)}
            </p>
            <h2 className="font-bold text-black text-3xl">Agendamento X</h2>
            <div className="flex flex-col mt-4 gap-2">
              <div className="flex flex-row items-center gap-2 text-gray-500 font-bold text-sm">
                <Clock size={16} />
                <p>30min</p>
              </div>
              <div className="flex flex-row items-center gap-2 text-gray-500 font-bold text-sm">
                <Video size={16} />
                <p>Video-conferência</p>
              </div>
            </div>
          </li>
          <li className="flex flex-col border-b-[1px] py-10">
            <p className="text-gray-500 font-bold text-base">
              {capitalizeFirstLetter(formattedDay)}
            </p>
            <h2 className="font-bold text-black text-3xl">Agendamento Y</h2>
            <div className="flex flex-col mt-4 gap-2">
              <div className="flex flex-row items-center gap-2 text-gray-500 font-bold text-sm">
                <Clock size={16} />
                <p>30min</p>
              </div>
              <div className="flex flex-row items-center gap-2 text-gray-500 font-bold text-sm">
                <Video size={16} />
                <p>Video-conferência</p>
              </div>
            </div>
          </li>
          <li className="flex flex-col border-b-[1px] py-10">
            <p className="text-gray-500 font-bold text-base">
              {capitalizeFirstLetter(formattedDay)}
            </p>
            <h2 className="font-bold text-black text-3xl">Agendamento Z</h2>
            <div className="flex flex-col mt-4 gap-2">
              <div className="flex flex-row items-center gap-2 text-gray-500 font-bold text-sm">
                <Clock size={16} />
                <p>30min</p>
              </div>
              <div className="flex flex-row items-center gap-2 text-gray-500 font-bold text-sm">
                <Video size={16} />
                <p>Video-conferência</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className="hidden xl:flex px-12 border-l-[1px]">
        <Calendar
          locale={ptBR}
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </div>
    </section>
  );
}
