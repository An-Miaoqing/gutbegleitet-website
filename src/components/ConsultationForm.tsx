import { useState } from "react";
import type { FormEvent } from "react";

export type ConsultationFormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

type ConsultationFormProps = {
  submitLabel?: string;
  formId?: string;
  /** Hook for future Zoho Bookings integration */
  onSubmit?: (data: ConsultationFormData) => void | Promise<void>;
};

const initialState: ConsultationFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export default function ConsultationForm({
  submitLabel = "Beratung anfragen",
  formId = "consultation-form",
  onSubmit,
}: ConsultationFormProps) {
  const [form, setForm] = useState<ConsultationFormData>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Zoho Bookings: replace this handler with API/widget integration
    if (onSubmit) {
      await onSubmit(form);
    }

    setSubmitted(true);
    setForm(initialState);
  };

  const update = (field: keyof ConsultationFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="rounded-2xl bg-teal-light p-8 text-center" role="status">
        <p className="text-2xl font-bold text-teal">Vielen Dank für Ihre Anfrage!</p>
        <p className="mt-3 text-lg text-gray-700">
          Wir melden uns so bald wie möglich bei Ihnen.
        </p>
        <button
          type="button"
          className="mt-6 text-lg font-bold text-teal underline"
          onClick={() => setSubmitted(false)}
        >
          Neue Anfrage senden
        </button>
      </div>
    );
  }

  return (
    <form
      id={formId}
      className="space-y-5"
      onSubmit={handleSubmit}
      noValidate
      data-form-type="consultation"
      data-integration="zoho-bookings-ready"
    >
      <div>
        <label htmlFor={`${formId}-name`} className="block text-base font-bold text-gray-800">
          Name <span className="text-orange">*</span>
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-2 w-full rounded-xl border border-grey-light bg-white px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="Vor- und Nachname"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className="block text-base font-bold text-gray-800">
          Telefon <span className="text-orange">*</span>
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="mt-2 w-full rounded-xl border border-grey-light bg-white px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="z. B. 0676 123 4567"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="block text-base font-bold text-gray-800">
          E-Mail
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="mt-2 w-full rounded-xl border border-grey-light bg-white px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="ihre@email.at"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="block text-base font-bold text-gray-800">
          Nachricht
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-2 w-full resize-none rounded-xl border border-grey-light bg-white px-4 py-4 text-lg text-gray-900 placeholder:text-gray-400 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
          placeholder="Wie können wir Ihnen helfen?"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-orange px-8 py-4 text-lg font-bold text-white shadow-md transition-colors hover:bg-orange-dark"
      >
        {submitLabel}
      </button>

      <p className="text-center text-sm text-grey-soft">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer Datenschutzerklärung zu.
      </p>
    </form>
  );
}
