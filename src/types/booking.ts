export type BookingStep = 1 | 2 | 3 | 4;

export type BookingService = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type BookingDuration = {
  id: string;
  label: string;
  hours: number | null;
  price: string;
};

export type BookingFormData = {
  date: string;
  time: string;
  service: string;
  duration: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
  city: string;
  message: string;
  consent: boolean;
};

export type AvailabilitySlot = {
  date: string;
  label: string;
  slots: string[];
};
