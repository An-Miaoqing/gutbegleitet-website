import { useMemo, useState, type FormEvent } from "react";
import PageHero from "../components/PageHero";
import { ServiceIcon } from "../components/icons";
import type { AvailabilitySlot, BookingDuration, BookingFormData, BookingService, BookingStep } from "../types/booking";

const services: BookingService[] = [
  {
    id: "shopping",
    title: "Einkaufen und Besorgungen",
    description: "Sicheres Einkaufen und Mitbringen von notwendigen Dingen.",
    icon: "shopping",
  },
  {
    id: "home",
    title: "Unterstützung im Haushalt",
    description: "Ordnung, Aufräumen und kleine Hilfe im Alltag.",
    icon: "home",
  },
  {
    id: "laundry",
    title: "Wäsche-Service",
    description: "Wäsche sammeln, waschen und ordentlich zusammenlegen.",
    icon: "laundry",
  },
  {
    id: "medical",
    title: "Arztbegleitung",
    description: "Begleitung zu Terminen und wichtigen Kontakten.",
    icon: "medical",
  },
  {
    id: "walk",
    title: "Spaziergänge und Freizeitbegleitung",
    description: "Gemeins frische Luft und etwas Bewegung genießen.",
    icon: "walk",
  },
  {
    id: "chat",
    title: "Gesellschaft und Aktivierung",
    description: "Anregende Gespräche, gemeinsame Aktivitäten und Begleitung.",
    icon: "chat",
  },
  {
    id: "help",
    title: "Individuelle Unterstützung",
    description: "Maßgeschneiderte Hilfe für Ihren Alltag.",
    icon: "help",
  },
];

const durations: BookingDuration[] = [
  { id: "2h", label: "2 Stunden", hours: 2, price: "ab 70 €" },
  { id: "4h", label: "4 Stunden", hours: 4, price: "ab 140 €" },
  { id: "6h", label: "6 Stunden", hours: 6, price: "ab 210 €" },
  { id: "custom", label: "Individuell", hours: null, price: "auf Anfrage" },
];

const availability: AvailabilitySlot[] = [
  { date: "2026-06-25", label: "Mi, 25.06.", slots: ["09:00", "10:30", "13:00", "15:30"] },
  { date: "2026-06-26", label: "Do, 26.06.", slots: ["08:30", "11:00", "14:00", "16:00"] },
  { date: "2026-06-29", label: "So, 29.06.", slots: ["10:00", "12:30", "14:30"] },
  { date: "2026-06-30", label: "Mo, 30.06.", slots: ["09:30", "11:30", "13:30", "15:00"] },
];

const stepLabels = ["Termin", "Leistung", "Dauer", "Ihre Angaben"];

const initialForm: BookingFormData = {
  date: "",
  time: "",
  service: "",
  duration: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  zip: "",
  city: "",
  message: "",
  consent: false,
};

export default function BookingPage() {
  const [step, setStep] = useState<BookingStep>(1);
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const selectedDate = useMemo(
    () => availability.find((slot) => slot.date === form.date),
    [form.date],
  );

  const updateField = (field: keyof BookingFormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return Boolean(form.date && form.time);
      case 2:
        return Boolean(form.service);
      case 3:
        return Boolean(form.duration);
      case 4:
        return Boolean(form.firstName && form.lastName && form.phone && form.consent);
      default:
        return false;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isStepValid()) {
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Termin buchen"
        title="Termin buchen"
        description="Planen Sie Ihren Termin bequem online – persönlich, verständlich und ohne Stress."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-grey-light bg-white p-5 shadow-xl shadow-teal/10 sm:p-8 lg:p-10">
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
                  {step === 1 && (
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-xl font-extrabold text-gray-900">Verfügbare Termine</h3>
                          <p className="mt-2 text-base leading-relaxed text-gray-700">
                            Wählen Sie ein Datum und eine Uhrzeit für Ihren gewünschten Besuch.
                          </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {availability.map((slot) => (
                            <button
                              key={slot.date}
                              type="button"
                              onClick={() => updateField("date", slot.date)}
                              className={`rounded-2xl border p-4 text-left transition-all ${
                                form.date === slot.date
                                  ? "border-teal bg-teal-light shadow-sm"
                                  : "border-grey-light bg-white hover:border-teal/40"
                              }`}
                            >
                              <p className="font-bold text-gray-900">{slot.label}</p>
                              <p className="mt-1 text-sm text-gray-600">Mehrere Uhrzeiten verfügbar</p>
                            </button>
                          ))}
                        </div>
                        {selectedDate && (
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">Verfügbare Uhrzeiten</h4>
                            <div className="mt-3 flex flex-wrap gap-3">
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
                            onClick={() => updateField("service", service.id)}
                            className={`rounded-[1.5rem] border p-5 text-left transition-all ${
                              form.service === service.id
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
                          onClick={() => updateField("duration", duration.id)}
                          className={`rounded-[1.5rem] border p-6 text-left transition-all ${
                            form.duration === duration.id
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
                          <span className="mb-2 block">Vorname</span>
                          <input
                            value={form.firstName}
                            onChange={(event) => updateField("firstName", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Max"
                          />
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Nachname</span>
                          <input
                            value={form.lastName}
                            onChange={(event) => updateField("lastName", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Mustermann"
                          />
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Telefonnummer</span>
                          <input
                            required
                            value={form.phone}
                            onChange={(event) => updateField("phone", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="+43 660 123 4567"
                          />
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
                        </label>
                        <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                          <span className="mb-2 block">Wohnadresse</span>
                          <input
                            value={form.address}
                            onChange={(event) => updateField("address", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Beispielstraße 12"
                          />
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">PLZ</span>
                          <input
                            value={form.zip}
                            onChange={(event) => updateField("zip", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="1010"
                          />
                        </label>
                        <label className="text-sm font-semibold text-gray-700">
                          <span className="mb-2 block">Ort</span>
                          <input
                            value={form.city}
                            onChange={(event) => updateField("city", event.target.value)}
                            className="w-full rounded-2xl border border-grey-light bg-white px-4 py-3 text-base text-gray-900 outline-none ring-0 transition focus:border-teal"
                            placeholder="Wien"
                          />
                        </label>
                        <label className="text-sm font-semibold text-gray-700 sm:col-span-2">
                          <span className="mb-2 block">Nachricht</span>
                          <textarea
                            rows={4}
                            value={form.message}
                            onChange={(event) => updateField("message", event.target.value)}
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
                            <p className="mt-1">{services.find((item) => item.id === form.service)?.title ?? "Noch offen"}</p>
                          </div>
                          <div className="rounded-2xl bg-white p-4">
                            <p className="font-semibold text-gray-900">Dauer</p>
                            <p className="mt-1">{durations.find((item) => item.id === form.duration)?.label ?? "Noch offen"}</p>
                          </div>
                        </div>

                        <label className="mt-6 flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-relaxed text-gray-700">
                          <input
                            type="checkbox"
                            checked={form.consent}
                            onChange={(event) => updateField("consent", event.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-teal focus:ring-teal"
                          />
                          <span>Ich stimme der Datenschutzerklärung zu.</span>
                        </label>
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
                          className="rounded-full bg-orange px-7 py-3 text-lg font-bold text-white shadow-lg shadow-orange/30 transition-colors hover:bg-orange-dark"
                        >
                          Termin anfragen
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
