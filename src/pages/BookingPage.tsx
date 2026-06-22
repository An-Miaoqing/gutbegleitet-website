import PageHero from "../components/PageHero";
import ConsultationForm from "../components/ConsultationForm";
import ContactDetails from "../components/ContactDetails";

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Beratung buchen"
        title="Kostenlose Erstberatung vereinbaren"
        description="Unverbindlich und persönlich – wir freuen uns, von Ihnen zu hören."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-extrabold text-teal sm:text-3xl">
                Beratungsanfrage stellen
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Füllen Sie das Formular aus – wir melden uns zeitnah bei Ihnen. Die Erstberatung ist
                kostenlos und unverbindlich.
              </p>

              <div className="mt-8 rounded-3xl border border-grey-light bg-white p-6 shadow-sm sm:p-8">
                {/* data-integration="zoho-bookings-ready" on form for future widget/API hookup */}
                <div id="zoho-bookings-slot" className="hidden" aria-hidden="true" />
                <ConsultationForm formId="booking-form" />
              </div>
            </div>

            <div className="rounded-3xl bg-teal p-8 sm:p-10">
              <h2 className="text-2xl font-extrabold text-white">Oder direkt kontaktieren</h2>
              <p className="mt-4 text-lg text-white/90">
                Sie möchten lieber telefonisch sprechen? Rufen Sie uns gerne an – wir sind für Sie da.
              </p>
              <div className="mt-8">
                <ContactDetails light />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
