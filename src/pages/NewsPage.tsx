import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Neuigkeiten & Veranstaltungen"
        description="Wir arbeiten derzeit an diesem Bereich."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[420px] items-center justify-center rounded-[2.5rem] border border-grey-light bg-gradient-to-br from-white via-orange-light/40 to-teal-light/50 px-6 py-16 shadow-sm sm:px-8 lg:px-12">
            <div className="max-w-3xl text-center">
              <div className="mx-auto mb-6 inline-flex items-center rounded-full bg-orange px-4 py-2 text-sm font-bold uppercase tracking-[0.25em] text-white shadow-sm">
                Demnächst verfügbar
              </div>
              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Neuigkeiten & Veranstaltungen
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 sm:text-xl">
                Wir arbeiten derzeit an diesem Bereich. Schon bald finden Sie hier aktuelle
                Neuigkeiten, Veranstaltungen und wichtige Informationen rund um Gut begleitet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
