"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ApiSelectProps<T extends { id: string }> {
  items: T[];
  value: string | null;
  onChange: (value: string | null) => void;
  displayField: string; // Changed from keyof T to string to allow dot notation
  placeholder?: string;
  emptyMessage?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ApiSelect<T extends { id: string }>({
  items,
  value,
  onChange,
  displayField,
  placeholder = "Selecione um item...",
  emptyMessage = "Nenhum item encontrado.",
  loading = false,
  disabled = false,
  className,
}: ApiSelectProps<T>) {
  const [open, setOpen] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedValue = (obj: any, path: string): string => {
    const keys = path.split(".");
    return keys.reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
      obj
    );
  };

  const selectedItem = React.useMemo(
    () => items.find((item) => item.id === value),
    [items, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled || loading}
        >
          {value && selectedItem
            ? getNestedValue(selectedItem, displayField)
            : placeholder}
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}`} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={getNestedValue(item, displayField)}
                onSelect={() => {
                  onChange(item.id === value ? null : item.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {getNestedValue(item, displayField)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
