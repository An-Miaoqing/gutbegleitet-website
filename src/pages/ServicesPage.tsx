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
          <div className="space-y-16 sm:space-y-20">
            {services.map((service, index) => (
              <section
                key={service.id}
                id={service.id}
                className={`scroll-mt-28 grid items-center gap-10 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <div
                    className={`inline-flex h-20 w-20 items-center justify-center rounded-full text-white ${
                      service.color === "teal" ? "bg-teal" : "bg-orange"
                    }`}
                  >
                    <ServiceIcon name={service.icon} className="h-10 w-10" />
                  </div>
                  <h2 className="mt-6 text-2xl font-extrabold text-teal sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-700">{service.description}</p>
                </div>

                <div
                  className={`rounded-3xl border p-8 lg:p-10 ${
                    service.color === "teal"
                      ? "border-teal/15 bg-teal-light/50"
                      : "border-orange/15 bg-orange-light/50"
                  } ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}
                >
                  <p className="text-lg font-semibold text-gray-800">{service.shortDescription}</p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Persönlich und respektvoll",
                      "Flexibel nach Ihren Wünschen",
                      "Direkt bei Ihnen zuhause in Wien",
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-base text-gray-700">
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white ${
                            service.color === "teal" ? "bg-teal" : "bg-orange"
                          }`}
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <CTABanner />
    </>
  );
}
