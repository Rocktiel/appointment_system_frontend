export interface InitiateAppointmentBookingRequest {
  businessId: string; // `BusinessDetails` id'si string ise
  date: string;
  start_time: string;
  end_time: string;
  customerName: string;
  customerPhone: string;
  serviceId: number;
  time_slot_template_id: number;
  note?: string;
}

// Randevu Başlatma için Yanıt Tipi (API'nizden dönen yanıta göre ayarlayın)
export interface InitiateAppointmentBookingResponse {
  success: boolean;
  message: string;
  phone: string; // Doğrulama için kullanılan telefon numarası
  // Diğer randevu başlatma detayları
}

// Telefon Doğrulama için Girdi Tipi
export interface VerifyPhoneNumberRequest {
  phone: string;
  code: string;
}

// Telefon Doğrulama için Yanıt Tipi (API'nizden dönen yanıta göre ayarlayın)
export interface VerifyPhoneNumberResponse {
  success: boolean;
  message: string;
  // Diğer doğrulama detayları
}

// Randevu Kesinleştirme için Girdi Tipi (Initiate ile benzer olabilir)
export interface FinalizeAppointmentRequest {
  businessId: string;
  date: string;
  start_time: string;
  end_time: string;
  customerName: string;
  customerPhone: string;
  serviceId: number;
  time_slot_template_id: number;
  note?: string;
}

// Randevu Kesinleştirme için Yanıt Tipi (API'nizden dönen yanıta göre ayarlayın)
export interface FinalizeAppointmentResponse {
  success: boolean;
  message: string;
  appointmentId: string;
  // Diğer kesinleştirme detayları
}

// Randevu iptal etme için Girdi Tipi
export interface CancelAppointmentRequest {
  businessId: string;
  date: string;
  start_time: string;
  end_time: string;
  customerName: string;
  customerPhone: string;
  serviceId: number;
  time_slot_template_id: number;
  note?: string;
}
export interface BusinessDetails {
  id: string;
  slug: string;
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  businessWebsite?: string;
  businessLocationUrl: string;
  isPhoneVisible: boolean;
  isLocationVisible: boolean;
  lat: number;
  lng: number;
  city: string;
  county: string;
}
export interface DetailedTimeSlot {
  id: number;
  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"
  isAvailableForBooking: boolean; // Bu slot boş mu? (Randevu ile çakışmıyor)
}
