"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Business } from "@/models/business.model";
import { useGetUserBusinessesQuery } from "@/services/businessApi";

interface BusinessSelectorProps {
  selectedBusinessId: string | null;
  onSelectBusiness: (businessId: string | null) => void;
}
const BusinessSelector2 = ({
  selectedBusinessId,
  onSelectBusiness,
}: BusinessSelectorProps) => {
  const {
    data: businesses,
    isLoading: isLoadingBusinesses,
    error: businessesError,
  } = useGetUserBusinessesQuery();

  return (
    <div>
      <Label htmlFor="business-select" className="mb-2 text-lg">
        İşletmeni Seç
      </Label>
      <Select
        value={selectedBusinessId || ""}
        onValueChange={(val) => onSelectBusiness(val)}
      >
        <SelectTrigger className="w-[200px] bg-white">
          <SelectValue placeholder="İşletme Seç" />
        </SelectTrigger>
        <SelectContent>
          {businesses?.map((b: Business) => (
            <SelectItem key={b.id} value={b.id.toString()}>
              {b.businessName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BusinessSelector2;
