import { getBusinessBySlug } from "@/lib/api-requests";

import { ClientAppointmentManager } from "@/components/appointment/ClientAppointmentManager";

import NotFound from "@/components/appointment/NotFound";
import { BusinessDetails } from "@/models/customer.model";

export default async function BusinessAppointmentPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const business: BusinessDetails | null = await getBusinessBySlug(slug);

  if (!business) {
    return <NotFound />;
  }

  return <ClientAppointmentManager initialBusiness={business} />;
}
