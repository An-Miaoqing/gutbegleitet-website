import { Link } from "react-router-dom";
import { audienceGroups, whyUsItems } from "../data/content";
import { services } from "../data/services";
import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import CTABanner from "../components/CTABanner";
import { ServiceIcon, PhoneIcon } from "../components/icons";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden pt-24 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="order-2 lg:order-1">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-light px-4 py-2 text-base font-bold text-teal">
                <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
                Mit Herz &amp; Verstand · Für Sie da
              </div>

              <h1 className="text-3xl font-extrabold leading-tight text-teal sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                Alltagshilfe und Begleitung für Senioren in Wien
              </h1>

              <p className="mt-5 text-xl font-semibold leading-relaxed text-gray-800 sm:text-2xl">
                Verlässliche Hilfe im Alltag – direkt bei Ihnen zu Hause.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-gray-700">
                Manchmal sind es die kleinen Dinge im Alltag, die Unterstützung erfordern. Wir von
                Gut Begleitet stehen Ihnen und Ihren Angehörigen mit Herz, Respekt und
                Zuverlässigkeit zur Seite.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  to="/beratung"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-7 py-4 text-lg font-bold text-white shadow-lg shadow-orange/30 transition-all hover:bg-orange-dark sm:w-auto"
                >
                  <PhoneIcon />
                  Termin buchen
                </Link>
                <Link
                  to="/leistungen"
                  className="inline-flex w-full items-center justify-center rounded-full border-2 border-teal bg-white px-7 py-4 text-lg font-bold text-teal transition-colors hover:bg-teal-light sm:w-auto"
                >
                  Unsere Leistungen
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute -right-4 -top-4 hidden h-full w-full rounded-3xl bg-orange/15 sm:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-teal/10">
                <img
                  src="/gut-begleitet-hero.jpeg"
                  alt="Betreuerin unterstützt eine Seniorin freundlich zu Hause"
                  className="aspect-[4/3] w-full object-cover"
                  width={900}
                  height={675}
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden max-w-[240px] rounded-2xl border border-grey-light bg-white p-4 shadow-lg sm:block">
                <p className="font-script text-2xl leading-snug text-teal">
                  Wir nehmen uns Zeit für das, was wirklich zählt: Sie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unsere Unterstützung für */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Unsere Unterstützung für" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {audienceGroups.map((group, index) => (
              <article
                key={group.title}
                className={`rounded-3xl border p-6 text-center ${
                  index % 2 === 0
                    ? "border-teal/15 bg-teal-light/40"
                    : "border-orange/15 bg-orange-light/40"
                }`}
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-white ${
                    index % 2 === 0 ? "bg-teal" : "bg-orange"
                  }`}
                >
                  <ServiceIcon name={group.icon} className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{group.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700">{group.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Warum Gut Begleitet? */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Warum Gut Begleitet?"
            description="Verlässlich. Persönlich. Gut begleitet."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {whyUsItems.map((item, index) => (
              <article
                key={item.title}
                className="rounded-3xl border border-grey-light bg-beige p-6 shadow-sm"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${
                    index % 2 === 0 ? "bg-teal" : "bg-orange"
                  }`}
                >
                  <ServiceIcon name={item.icon} className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Leistungen"
            title="Unsere Unterstützung im Alltag"
            description="Von Einkäufen bis Gesellschaft – wir helfen dort, wo Sie uns brauchen."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/leistungen"
              className="inline-flex items-center justify-center rounded-full bg-teal px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-teal-dark"
            >
              Alle Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome teaser */}
      <section className="bg-teal-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                align="left"
                title="Herzlich willkommen bei Gut Begleitet"
                description="Ihr verlässlicher Partner für Alltagshilfe und Begleitung in Wien."
              />
              <p className="mt-6 text-lg leading-relaxed text-gray-700">
                Erfahren Sie mehr über unsere Mission, unsere Werte und für wen wir da sind.
              </p>
              <Link
                to="/ueber-uns"
                className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-teal bg-white px-8 py-4 text-lg font-bold text-teal transition-colors hover:bg-teal hover:text-white"
              >
                Mehr über uns
              </Link>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="/home-page-2.jpeg"
                alt="Betreuerin geht gemeinsam mit einer Seniorin spazieren"
                className="aspect-[4/3] w-full object-cover"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
