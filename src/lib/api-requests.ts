import { BusinessDetails } from "@/models/customer.model";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBusinessBySlug(
  slug: string
): Promise<BusinessDetails | null> {
  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL environment variable is not set.");
    return null;
  }
  try {
    const res = await fetch(`${API_URL}/customers/business/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`API Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching business details (${slug}):`, error);
    return null;
  }
}
