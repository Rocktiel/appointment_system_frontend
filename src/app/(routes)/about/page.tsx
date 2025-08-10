import InfoCard from "@/components/about/InfoCard";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4 mt-5 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">
          Hakkımızda
        </h1>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          YourBrand, işletmelerin randevu süreçlerini dijitalleştirmek ve
          optimize etmek amacıyla kurulmuş yenilikçi bir platformdur. Amacımız,
          hem işletmelerin verimliliğini artırmak hem de müşterilerine daha
          hızlı ve kolay bir randevu deneyimi sunmaktır.
        </p>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Teknolojiyi kullanarak randevu yönetimini basit, hızlı ve erişilebilir
          hale getirmeyi hedefliyoruz. Küçük ve orta ölçekli işletmelerden büyük
          kurumsal yapılara kadar her türlü işletmenin ihtiyaçlarına cevap
          verebilecek esnek çözümler sunuyoruz.
        </p>
        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Ekibimiz, yazılım geliştirme, kullanıcı deneyimi tasarımı ve iş
          süreçleri yönetimi konularında uzmanlaşmış profesyonellerden
          oluşmaktadır. Sürekli gelişen teknolojiye ayak uydurarak, sizlere en
          iyi hizmeti sunmak için çalışıyoruz.
        </p>
        <h2 className="text-3xl font-bold text-amber-300 mt-12 mb-6 text-center">
          Vizyonumuz ve Misyonumuz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoCard
            title="Vizyonumuz"
            description="Her işletmenin randevu yönetimini zahmetsizce yapabildiği, müşterileriyle sorunsuz bir şekilde etkileşim kurduğu ve dijital dönüşümün liderliğini üstlendiği bir gelecek yaratmaktır."
          />
          <InfoCard
            title="Misyonumuz"
            description="İşletmelere kullanıcı dostu, güvenilir ve ölçeklenebilir randevu yönetim çözümleri sunarak, onların operasyonel yükünü azaltmak, müşteri memnuniyetini artırmak ve sürdürülebilir büyümelerine katkıda bulunmaktır."
          />
        </div>
      </div>
    </div>
  );
}
