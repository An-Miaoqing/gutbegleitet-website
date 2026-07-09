export type BookingStep = 1 | 2 | 3 | 4;

export type BookingService = {
  id: string;
  serviceCode: string;
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
  serviceCode: string;
  durationId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  houseNumber: string;
  apartment: string;
  postalCode: string;
  city: string;
  customerNote: string;
  privacyAccepted: boolean;
  privacyAcceptedAt: string | null;
};

export type AvailabilitySlot = {
  date: string;
  label: string;
  slots: string[];
};
