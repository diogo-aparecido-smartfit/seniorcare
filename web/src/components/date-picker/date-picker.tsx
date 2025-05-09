"use client";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const formattedDate = isToday(selectedDate)
    ? "Hoje"
    : format(selectedDate, "EEEE, dd/MM/yyyy", { locale: ptBR });

  const buttonText = selectedDate ? formattedDate : "Escolha uma data";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-fit justify-start text-left font-semibold text-xl",
            !selectedDate && "text-muted-foreground"
          )}
        >
          {buttonText}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
