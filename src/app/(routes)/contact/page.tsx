import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4 mt-5 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">
          Bizimle İletişime Geçin
        </h1>
        <p className="text-lg text-gray-300 mb-12 text-center">
          Herhangi bir sorunuz, geri bildiriminiz veya iş birliği teklifiniz mi
          var? Aşağıdaki bilgilerden bize ulaşabilir veya formu
          doldurabilirsiniz.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
