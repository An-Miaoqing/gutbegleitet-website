import { services } from "../data/services";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import { ServiceIcon } from "../components/icons";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Unsere Leistungen"
        description="Warme, persönliche Unterstützung im Alltag – abgestimmt auf Ihre Bedürfnisse in Wien."
      />

      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 rounded-[2rem] border border-teal/10 bg-teal-light/60 p-8 shadow-sm sm:p-10">
            <h2 className="text-2xl font-extrabold text-teal sm:text-3xl">
              Warum unsere Leistungen so hilfreich sind
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Persönlich und respektvoll",
                "Flexibel nach Ihren Wünschen",
                "Direkt bei Ihnen zuhause in Wien",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 text-base text-gray-700 shadow-sm">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-28 overflow-hidden rounded-[2rem] bg-white shadow-lg shadow-teal/10"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-80 w-full object-cover sm:h-96"
                />

                <div className="p-8">
                  <div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-white ${
                      service.color === "teal" ? "bg-teal" : "bg-orange"
                    }`}
                  >
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-teal">{service.title}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-700">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
