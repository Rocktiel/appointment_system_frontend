import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

export const BusinessSearchHero = () => {
  return (
    <section className="relative bg-gray-900 text-white py-20 overflow-hidden mt-10">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-20" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
            Mükemmel Hizmeti Bul
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Bölgenizdeki en iyi işletmelerde randevunuzu kolayca oluşturun
        </p>
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-md text-white flex items-center gap-2 cursor-pointer hover:scale-102 transition-transform duration-300"
          >
            Hemen Keşfet <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
