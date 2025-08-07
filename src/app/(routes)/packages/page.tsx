import PackageCardList from "@/components/home/sections/Pricing/PackageCardList";

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">
          Paketlerimiz
        </h1>
        <p className="text-lg text-gray-300 mb-12 text-center">
          İşletmenizin ihtiyaçlarına en uygun planı seçin. Esnek ve uygun
          fiyatlı çözümlerle hemen başlayın.
        </p>

        <PackageCardList />
      </div>
    </div>
  );
}
