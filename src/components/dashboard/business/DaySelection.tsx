import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { DAYS } from "@/app/dashboard/business/time-slots/Days";

interface DaySelectionProps {
  selectedDayId: number | null;
  setSelectedDayId: (id: number) => void;
}
const DaySelection = ({
  selectedDayId,
  setSelectedDayId,
}: DaySelectionProps) => {
  return (
    <div>
      {" "}
      <Label htmlFor="day-select" className="text-right">
        Gün Seç
      </Label>
      <Select
        value={selectedDayId?.toString() || ""}
        onValueChange={(val) => setSelectedDayId(Number(val))}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Gün Seç" />
        </SelectTrigger>
        <SelectContent>
          {DAYS.map((d) => (
            <SelectItem key={d.id} value={d.id.toString()}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DaySelection;
