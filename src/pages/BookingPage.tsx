import { useMemo, useState, type FormEvent } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingApiError, createBooking, type CreateBookingRequest } from "../api/booking";
import PageHero from "../components/PageHero";
import { ServiceIcon } from "../components/icons";
import type { AvailabilitySlot, BookingDuration, BookingFormData, BookingService, BookingStep } from "../types/booking";

const services: BookingService[] = [
  {
    id: "shopping",
    serviceCode: "SHOPPING",
    title: "Einkaufen und Besorgungen",
    description: "Sicheres Einkaufen und Mitbringen von notwendigen Dingen.",
    icon: "shopping",
  },
  {
    id: "home",
    serviceCode: "HOUSEKEEPING",
    title: "Unterstützung im Haushalt",
    description: "Ordnung, Aufräumen und kleine Hilfe im Alltag.",
    icon: "home",
  },
  {
    id: "laundry",
    serviceCode: "LAUNDRY",
    title: "Wäsche-Service",
    description: "Wäsche sammeln, waschen und ordentlich zusammenlegen.",
    icon: "laundry",
  },
  {
    id: "medical",
    serviceCode: "MEDICAL_ESCORT",
    title: "Begleitung zu Arztterminen",
    description: "Begleitung zu Terminen und wichtigen Kontakten.",
    icon: "medical",
  },
  {
    id: "walk",
    serviceCode: "LEISURE_COMPANIONSHIP",
    title: "Spaziergänge und Freizeitbegleitung",
    description: "Gemeins frische Luft und etwas Bewegung genießen.",
    icon: "walk",
  },
  {
    id: "chat",
    serviceCode: "SOCIAL_COMPANIONSHIP",
    title: "Gesellschaft und Aktivierung",
    description: "Anregende Gespräche, gemeinsame Aktivitäten und Begleitung.",
    icon: "chat",
  },
  {
    id: "small-help",
    serviceCode: "SMALL_DAILY_HELP",
    title: "Kleine Hilfen im Alltag",
    description: "Kleine Unterstützung im täglichen Leben, wie Einkaufen, Besorgungen, Begleitung oder sonstige Alltagshilfen.",
    icon: "help",
  },
  {
    id: "help",
    serviceCode: "CUSTOM_SUPPORT",
    title: "Individuelle Unterstützung",
    description: "Maßgeschneiderte Hilfe für Ihren Alltag.",
    icon: "help",
  },
];

const durations: BookingDuration[] = [
  { id: "2h", label: "2 Stunden", hours: 2, price: "ab 50 €" },
  { id: "4h", label: "4 Stunden", hours: 4, price: "ab 100 €" },
  { id: "6h", label: "6 Stunden", hours: 6, price: "ab 150 €" },
  { id: "custom", label: "Individuell", hours: null, price: "auf Anfrage" },
];

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const parseLocalDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const generateAvailability = () => {
  const today = new Date();
  const dates: AvailabilitySlot[] = [];

  for (let i = 0; i < 180; i += 1) {
    const current = new Date(today);
    current.setDate(today.getDate() + i);

    if (current.getDay() === 0 || current.getDay() === 6) {
      continue;
    }

    const isoDate = formatLocalDate(current);
    const label = current.toLocaleDateString("de-DE", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
    });

    const slots = ["09:00", "10:30", "13:00", "15:30"];
    if (current.getDay() === 3) {
      slots[0] = "08:30";
    }

    dates.push({ date: isoDate, label, slots });

    if (dates.length >= 24) {
      break;
    }
  }

  return dates;
};

const availability = generateAvailability();

const stepLabels = ["Termin", "Leistung", "Dauer", "Ihre Angaben"];

const initialForm: BookingFormData = {
  date: "",
  time: "",
  serviceCode: "",
  durationId: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  street: "",
  houseNumber: "",
  apartment: "",
  postalCode: "",
  city: "",
  customerNote: "",
  privacyAccepted: false,
  privacyAcceptedAt: null,
};

const COMPANY_ZVR_NUMBER = "1429148037";

const buildAppointmentDateTime = (date: string, time: string) => {
  if (!date || !time) {
    return "";
  }

  const [hours, minutes] = time.split(":").map(Number);
  const [year, month, day] = date.split("-").map(Number);
  const appointmentDate = new Date(year, month - 1, day, hours, minutes, 0, 0);

  return appointmentDate.toISOString();
};

const isValidEmail = (email: string) => {
  if (!email) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>(1);
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedDate = useMemo(
    () => availability.find((slot) => slot.date === form.date),
    [form.date],
  );
  const selectedService = useMemo(
    () => services.find((service) => service.serviceCode === form.serviceCode),
    [form.serviceCode],
  );
  const selectedDuration = useMemo(
    () => durations.find((duration) => duration.id === form.durationId),
    [form.durationId],
  );
  const appointmentDateTime = useMemo(
    () => buildAppointmentDateTime(form.date, form.time),
    [form.date, form.time],
  );

  const updateField = (field: keyof BookingFormData, value: string | boolean | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const nextErrors = { ...prev };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return Boolean(form.date && form.time);
      case 2:
        return Boolean(form.serviceCode);
      case 3:
        return Boolean(form.durationId);
      case 4:
        return Boolean(form.firstName && form.lastName && form.phone && form.street && form.houseNumber && form.postalCode && form.city && form.serviceCode && form.durationId && form.date && form.time && form.privacyAccepted);
      default:
        return false;
    }
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "Bitte geben Sie Ihren Vornamen ein.";
    }
    if (!form.lastName.trim()) {
      nextErrors.lastName = "Bitte geben Sie Ihren Nachnamen ein.";
    }
    if (!form.phone.trim()) {
      nextErrors.phone = "Bitte geben Sie Ihre Telefonnummer ein.";
    }
    if (!form.street.trim()) {
      nextErrors.street = "Bitte geben Sie Ihre Straße ein.";
    }
    if (!form.houseNumber.trim()) {
      nextErrors.houseNumber = "Bitte geben Sie Ihre Hausnummer ein.";
    }
    if (!form.postalCode.trim()) {
      nextErrors.postalCode = "Bitte geben Sie Ihre Postleitzahl ein.";
    }
    if (!form.city.trim()) {
      nextErrors.city = "Bitte geben Sie Ihren Ort ein.";
    }
    if (!form.serviceCode) {
      nextErrors.serviceCode = "Bitte wählen Sie eine Leistung aus.";
    }
    if (!form.durationId) {
      nextErrors.durationId = "Bitte wählen Sie eine Dauer aus.";
    }
    if (!form.date || !form.time) {
      nextErrors.appointment = "Bitte wählen Sie einen Termin aus.";
    }
    if (!form.privacyAccepted) {
      nextErrors.privacyAccepted = "Bitte akzeptieren Sie die Datenschutzerklärung.";
    }
    if (!isValidEmail(form.email)) {
      nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!selectedDuration?.hours) {
      setErrors({
        durationId: "Bitte wählen Sie eine konkrete Dauer aus.",
      });
      return;
    }

    const customerNote = [
      form.customerNote.trim(),
      appointmentDateTime ? `Gewünschter Termin: ${appointmentDateTime}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const bookingPayload: CreateBookingRequest = {
      companyZvrNumber: COMPANY_ZVR_NUMBER,
      serviceCode: form.serviceCode,
      hours: selectedDuration.hours,
      ...(customerNote ? { customerNote } : {}),
      household: {
        name: `Haushalt ${form.lastName.trim()}`,
        street: form.street.trim(),
        houseNumber: form.houseNumber.trim(),
        apartment: form.apartment.trim() || undefined,
        postalCode: form.postalCode.trim(),
        city: form.city.trim(),
      },
      client: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
      },
    };

    try {
      setIsSubmitting(true);
      await createBooking(bookingPayload);
      setForm(initialForm);
      setSubmitted(true);
    } catch (error) {
      setErrors({
        form:
          error instanceof BookingApiError
            ? error.message
            : "Derzeit kann keine Anfrage gesendet werden. Bitte versuchen Sie es später erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Termin buchen"
        title="Termin Buchen"
        description="Planen Sie Ihren Termin bequem online – persönlich, verständlich und ohne Stress."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-grey-light bg-white p-5 shadow-xl shadow-teal/10 sm:p-8 lg:p-10">
            <div className="mb-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 shadow-sm sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 01-1.063.852l-.041-.02a.75.75 0 01-.852-1.063l.708-2.836a.75.75 0 01.852-1.063zM12 2.25a.75.75 0 01.75.75v.75h-1.5V3A.75.75 0 0112 2.25zm0 3.75a.75.75 0 00-.75.75v.75h1.5V6.75A.75.75 0 0012 6zm0 3.75a.75.75 0 00-.75.75v.75h1.5v-.75A.75.75 0 0012 9.75zm0 3.75a.75.75 0 00-.75.75v.75h1.5v-.75A.75.75 0 0012 13.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">Termin vereinbaren</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">
                    Buchen Sie Ihren Termin bequem online über das Formular oder vereinbaren Sie ihn telefonisch unter:
                  </p>
                  <a href="tel:+4368110194236" className="mt-3 inline-flex items-center rounded-full bg-white px-4 py-2 text-base font-bold text-orange shadow-sm transition-colors hover:bg-orange-light">
                    +43 681 1019 4236
                  </a>
                  <p className="mt-3 text-base leading-relaxed text-gray-700">
                    Wählen Sie einfach die Möglichkeit, die für Sie am besten passt.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-grey-light bg-teal-light/70 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
                    Schritt {step} von 4
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold text-teal sm:text-3xl">
                    {step === 1 && "1. Termin auswählen"}
                    {step === 2 && "2. Leistung auswählen"}
                    {step === 3 && "3. Dauer auswählen"}
                    {step === 4 && "4. Ihre Angaben"}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-700">
                    Ein einfacher Ablauf für eine ruhige Planung – passend für Sie, Ihre Angehörigen
                    und alle, die Unterstützung zu Hause wünschen.
                  </p>
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal shadow-sm">
                  {stepLabels[step - 1]}
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-teal to-orange transition-all duration-300"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            <div className="mt-8" data-integration="zoho-bookings-ready">
              {submitted ? (
                <div className="rounded-[1.5rem] border border-teal/20 bg-teal-light p-8 text-center shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
                    Vielen Dank
                  </p>
                  <h3 className="mt-3 text-2xl font-extrabold text-teal sm:text-3xl">
                    Vielen Dank für Ihre Anfrage.
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-700">
                    Wir werden uns zeitnah mit Ihnen in Verbindung setzen.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                      setForm(initialForm);
                    }}
                    className="mt-8 rounded-full bg-orange px-7 py-3 text-lg font-bold text-white shadow-lg shadow-orange/30 transition-colors hover:bg-orange-dark"
                  >
                    Neue Anfrage starten
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {errors.form && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                      {errors.form}
                    </div>
                  )}

                  {step === 1 && (
                    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl font-extrabold text-gray-900">Kalender</h3>
                          <p className="mt-2 text-base leading-relaxed text-gray-700">
                            Wählen Sie ein zukünftiges Datum. Danach erscheinen die verfügbaren Uhrzeiten.
                          </p>
                        </div>

                        <div className="rounded-[1.5rem] border border-grey-light bg-white p-3 shadow-sm sm:p-4">
                          <Calendar
                            onChange={(value) => {
                              if (value instanceof Date) {
                                const isoDate = formatLocalDate(value);
                                updateField("date", isoDate);
                                updateField("time", "");
                              }
                            }}
                            value={form.date ? parseLocalDate(form.date) : undefined}
                            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                            locale="de-DE"
                            className="w-full rounded-[1.25rem] border-0"
                            tileClassName={({ date }) => {
                              const isoDate = formatLocalDate(date);
                              const isSelected = form.date === isoDate;
                              const isToday = date.toDateString() === new Date().toDateString();
                              return `rounded-xl ${isSelected ? "bg-teal text-white" : ""} ${isToday ? "font-extrabold ring-2 ring-orange" : ""}`;
                            }}
                            prev2Label={null}
                            next2Label={null}
                          />
                        </div>

                        {selectedDate && (
                          <div className="rounded-[1.5rem] border border-grey-light bg-white p-5 shadow-sm">
                            <h4 className="text-lg font-bold text-gray-900">Verfügbare Uhrzeiten</h4>
                            <p className="mt-1 text-sm text-gray-600">Bitte wählen Sie eine Uhrzeit für {selectedDate.label}.</p>
                            <div className="mt-4 flex flex-wrap gap-3">
                              {selectedDate.slots.map((slot) => (
                                <button
                                  key={slot}
                                  type="button"
                                  onClick={() => updateField("time", slot)}
                                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                                    form.time === slot
                                      ? "border-teal bg-teal text-white"
                                      : "border-grey-light bg-white text-gray-700 hover:border-teal/40"
                                  }`}
                                >
                                  {slot} Uhr
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-grey-light">
                        <h3 className="text-xl font-extrabold text-gray-900">Ihre Auswahl</h3>
                        <div className="mt-5 space-y-4 text-sm text-gray-700">
                          <div className="rounded-2xl bg-beige p-4">
                            <p className="font-semibold text-gray-900">Datum</p>
                            <p className="mt-1">{selectedDate?.label ?? "Bitte wählen Sie ein Datum"}</p>
                          </div>
                          <div className="rounded-2xl bg-beige p-4">
                            <p className="font-semibold text-gray-900">Uhrzeit</p>
                            <p className="mt-1">{form.time ? `${form.time} Uhr` : "Bitte wählen Sie eine Uhrzeit"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => updateField("serviceCode", service.serviceCode)}
                            className={`rounded-[1.5rem] border p-5 text-left transition-all ${
                              form.serviceCode === service.serviceCode
                                ? "border-teal bg-teal-light shadow-sm"
                                : "border-grey-light bg-white hover:border-teal/40"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-teal shadow-sm">
                                <ServiceIcon name={service.icon} className="h-6 w-6" />
                              </div>
                              <div>
                                <h3 className="text-lg font-extrabold text-gray-900">{service.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="grid gap-4 md:grid-cols-2">
                      {durations.map((duration) => (
                        <button
                          key={duration.id}
                          type="button"
                          onClick={() => updateField("durationId", duration.id)}
                          className={`rounded-[1.5rem] border p-6 text-left transition-all ${
                            form.durationId === duration.id
                              ? "border-orange bg-orange-light/60 shadow-sm"
                              : "border-grey-light bg-white hover:border-orange/40"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-extrabold text-gray-900">{duration.label}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                                {duration.hours ? `Für etwa ${duration.hours} Stunden Betreuung.` : "Flexible Dauer passend zu Ihrem Bedarf."}
                              </p>
                            </div>
                            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange shadow-sm">
                              {duration.price}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {step === 4 && (
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Vorname *</span>
                          <input
                            value={form.firstName}
                            onChange={(event) => updateField("firstName", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Max"
                          />
                          {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Nachname *</span>
                          <input
                            value={form.lastName}
                            onChange={(event) => updateField("lastName", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Mustermann"
                          />
                          {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Telefonnummer *</span>
                          <input
                            value={form.phone}
                            onChange={(event) => updateField("phone", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="+43 660 123 4567"
                          />
                          {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">E-Mail-Adresse</span>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="name@email.com"
                          />
                          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Straße *</span>
                          <input
                            value={form.street}
                            onChange={(event) => updateField("street", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Beispielstraße"
                          />
                          {errors.street && <p className="mt-2 text-sm text-red-600">{errors.street}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Hausnummer *</span>
                          <input
                            value={form.houseNumber}
                            onChange={(event) => updateField("houseNumber", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="12"
                          />
                          {errors.houseNumber && <p className="mt-2 text-sm text-red-600">{errors.houseNumber}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Stiege / Tür (optional)</span>
                          <input
                            value={form.apartment}
                            onChange={(event) => updateField("apartment", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="2 / 3"
                          />
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">PLZ *</span>
                          <input
                            value={form.postalCode}
                            onChange={(event) => updateField("postalCode", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="1010"
                          />
                          {errors.postalCode && <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Ort *</span>
                          <input
                            value={form.city}
                            onChange={(event) => updateField("city", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Wien"
                          />
                          {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
                        </label>
                        <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                          <span className="mb-2 block">Nachricht</span>
                          <textarea
                            rows={4}
                            value={form.customerNote}
                            onChange={(event) => updateField("customerNote", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Bitte teilen Sie uns weitere Hinweise mit."
                          />
                        </label>
                      </div>

                      <div className="rounded-[1.5rem] bg-beige p-6 shadow-sm">
                        <h3 className="text-xl font-extrabold text-gray-900">Ihre Anfrage im Überblick</h3>
                        <div className="mt-5 space-y-4 text-sm text-gray-700">
                          <div className="rounded-2xl bg-white p-4">
                            <p className="font-semibold text-gray-900">Termin</p>
                            <p className="mt-1">{selectedDate?.label ?? "Noch offen"} · {form.time ? `${form.time} Uhr` : "Noch offen"}</p>
                          </div>
                          <div className="rounded-2xl bg-white p-4">
                            <p className="font-semibold text-gray-900">Leistung</p>
                            <p className="mt-1">{selectedService?.title ?? "Noch offen"}</p>
                          </div>
                          <div className="rounded-2xl bg-white p-4">
                            <p className="font-semibold text-gray-900">Dauer</p>
                            <p className="mt-1">{selectedDuration?.label ?? "Noch offen"}</p>
                          </div>
                          <div className="rounded-2xl bg-white p-4">
                            <p className="font-semibold text-gray-900">Adresse</p>
                            <p className="mt-1">
                              {form.street || form.houseNumber
                                ? `${[form.street, form.houseNumber].filter(Boolean).join(" ")}`
                                : "Noch offen"}
                            </p>
                            <p className="mt-1">
                              {form.postalCode || form.city
                                ? `${[form.postalCode, form.city].filter(Boolean).join(" ")}`
                                : ""}
                            </p>
                          </div>
                        </div>

                        <label className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-relaxed text-gray-700">
                          <input
                            type="checkbox"
                            checked={form.privacyAccepted}
                            onChange={(event) => {
                              const isAccepted = event.target.checked;
                              updateField("privacyAccepted", isAccepted);
                              updateField("privacyAcceptedAt", isAccepted ? new Date().toISOString() : null);
                            }}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-teal focus:ring-teal"
                          />
                          <span>Ich stimme der Datenschutzerklärung zu.</span>
                        </label>
                        {errors.privacyAccepted && <p className="mt-2 text-sm text-red-600">{errors.privacyAccepted}</p>}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col-reverse gap-3 border-t border-grey-light pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={() => setStep((current) => (current > 1 ? (current - 1) as BookingStep : current))}
                          className="rounded-full border border-grey-light px-6 py-3 text-lg font-semibold text-gray-700 transition-colors hover:bg-grey-light"
                        >
                          Zurück
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={() => setStep((current) => (current < 4 ? (current + 1) as BookingStep : current))}
                          disabled={!isStepValid()}
                          className="rounded-full bg-teal px-7 py-3 text-lg font-bold text-white shadow-lg shadow-teal/20 transition-colors hover:bg-teal-dark disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          Weiter
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={!form.privacyAccepted || isSubmitting}
                          className="rounded-full bg-orange px-7 py-3 text-lg font-bold text-white shadow-lg shadow-orange/30 transition-colors hover:bg-orange-dark disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          {isSubmitting ? "Anfrage wird gesendet..." : "Termin anfragen"}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
