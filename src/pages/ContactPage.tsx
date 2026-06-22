import PageHero from "../components/PageHero";
import ConsultationForm from "../components/ConsultationForm";
import ContactDetails, { MapPlaceholder } from "../components/ContactDetails";
import CTABanner from "../components/CTABanner";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Kontaktieren Sie uns"
        description="Wir freuen uns auf Ihre Nachricht – persönlich, unkompliziert und mit Zeit für Ihre Fragen."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-extrabold text-teal sm:text-3xl">Kontaktdaten</h2>
              <div className="mt-8">
                <ContactDetails />
              </div>
            </div>

            <div className="rounded-3xl border border-grey-light bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold text-teal">Nachricht senden</h2>
              <p className="mt-3 text-lg text-gray-700">
                Schreiben Sie uns – wir antworten so bald wie möglich.
              </p>
              <div className="mt-6">
                <ConsultationForm formId="contact-form" submitLabel="Nachricht senden" />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-teal sm:text-3xl">So finden Sie uns</h2>
            <div className="mt-8">
              <MapPlaceholder />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
