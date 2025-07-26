export enum BusinessTypes {
  MAKEUP = "MAKEUP",
  HAIR = "HAIR",
  NAIL = "NAIL",
  OTHER = "OTHER",
}

export interface BusinessRequest {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite?: string;
  businessDescription?: string;
  businessLogo?: string;
  businessType: BusinessTypes;
  businessLocationUrl: string;
  isPhoneVisible: boolean;
  isLocationVisible: boolean;
  lat: number;
  lng: number;
}

export interface Business extends BusinessRequest {
  id: number;
  slug: string;
}

export interface SubscriptionPlan {
  id: number;
  name: string;
  maxBusinesses: number;
  price: number;
  description: string;
}
export interface TimeInterval {
  id: number;
  businessId: number;
  dayId: number; // örnek: "Monday"
  start_time: string; // "HH:mm"
  end_time: string; // "HH:mm"
}

export interface CreateTimeIntervalRequest {
  businessId: number;
  dayId: number;
  startTime: string;
  endTime: string;
}
export interface Appointment {
  date: string;
  customerName: string;
  customerPhone: string;
  note: string;
  timeSlotTemplateId: number;
  service: ServiceDetails;
  start_time: string;
  end_time: string;
  day_id: number;
  status: string;
}
export interface ServiceDetails {
  id: number;
  name: string;
  price: number;
  durationMinutes: number;
  // Diğer servis detayları buraya gelebilir
}

export interface AppointmentRequest {
  businessId: number;
  date: string;
  time_slot_template_id: number;
}
