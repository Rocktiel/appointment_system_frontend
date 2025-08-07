// import { getBusinessBySlug } from "@/lib/api-requests";

// import { ClientAppointmentManager } from "@/components/appointment/ClientAppointmentManager";

// import NotFound from "@/components/appointment/NotFound";
// import { BusinessDetails } from "@/models/customer.model";

// export default async function BusinessAppointmentPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const { slug } = params;

//   const business: BusinessDetails | null = await getBusinessBySlug(slug);

//   if (!business) {
//     return <NotFound />;
//   }

//   return <ClientAppointmentManager initialBusiness={business} />;
// }

// app/[slug]/page.tsx
// app/[slug]/page.tsx
// ... (diğer import'lar)

// BusinessDetails tipini doğru yerden import ettiğinizden emin olun
// veya "@/models/customer.model"

// Next.js'in PageProps'unu doğrudan import etmek yerine,
// kendi PageProps tanımımızı Next.js'in beklentisine göre yapalım.
// Bu, genellikle Next.js'in iç tipleriyle uyumlu olmak için yapılır.
import { ClientAppointmentManager } from "@/components/appointment/ClientAppointmentManager";
import NotFound from "@/components/appointment/NotFound";
import { getBusinessBySlug } from "@/lib/api-requests";
import { BusinessDetails } from "@/models/customer.model";

// Dinamik parametrelerinizin tipini tanımlayın
interface BusinessPageParams {
  slug: string;
}

// Next.js'in dahili olarak beklediği PageProps yapısına uygun hale getirin.
// params'ın bir Promise olabileceğini belirtiyoruz.
interface CustomPageProps {
  // params burada opsiyonel olmasına rağmen, Next.js dinamik rotalarda genellikle dolu gelir.
  // TypeScript'in güvence altına alması için Promise<BusinessPageParams> | undefined olarak bırakmak doğru.
  params?: Promise<BusinessPageParams>;
  searchParams?: Promise<any>;
}

// BusinessAppointmentPage bileşeninizin prop tipi
type BusinessAppointmentPageProps = CustomPageProps;

export default async function BusinessAppointmentPage({
  params,
}: BusinessAppointmentPageProps) {
  // params'ın mevcut olduğundan emin olun ve await ile çözün
  // Eğer params undefined ise, resolvedParams da undefined olacaktır.
  const resolvedParams = params ? await params : undefined;

  // resolvedParams'ın ve slug'ın varlığını kontrol edin
  if (!resolvedParams || !resolvedParams.slug) {
    // Eğer slug yoksa (ki dinamik rotada beklenmez ama tip güvenliği için kontrol ederiz)
    // veya resolvedParams undefined ise NotFound göster
    return <NotFound />;
  }

  const { slug } = resolvedParams; // Çözülmüş params'tan slug'ı güvenle alın

  const business: BusinessDetails | null = await getBusinessBySlug(slug);

  if (!business) {
    return <NotFound />;
  }

  return <ClientAppointmentManager initialBusiness={business} />;
}
