import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

interface BusinessCardProps {
  business: any;
  onSelect: (slug: string) => void;
}
const BusinessCard = ({ business, onSelect }: BusinessCardProps) => (
  <div className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />

    <Image
      src={business.image || "/business-placeholder.jpg"}
      alt={business.businessName}
      width={400}
      height={200}
      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    />
    <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-white font-bold text-lg">
            {business.businessName}
          </h3>
          <p className="text-amber-200 text-sm flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            {business.rating || "4.5"} (120 değerlendirme)
          </p>
        </div>
        <Button
          onClick={() => onSelect(business.slug)}
          size="sm"
          className="bg-amber-500 hover:bg-amber-600"
        >
          Randevu Al
        </Button>
      </div>
    </div>
  </div>
);
export default BusinessCard;
