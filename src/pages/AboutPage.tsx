import { missionContent } from "../data/content";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import CTABanner from "../components/CTABanner";

export default function AboutPage() {
  const { welcome, mission, highlights, forWhom } = missionContent;

  return (
    <>
      <PageHero
        eyebrow="Über Uns"
        title={welcome.title}
        description={
          <>
            Viele Menschen brauchen keine Pflege – sondern <strong>Hilfe</strong>. Beim <strong>Einkaufen</strong>, beim{" "}
            <strong>Arzttermin</strong>, im <strong>Haushalt</strong>, oder einfach <strong>jemanden, der da ist.</strong>
          </>
        }
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading align="left" title={mission.title} />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
                <p>
                  <strong>Gut Begleitet</strong> ist genau diese Unterstützung: menschlich, verlässlich und auf Ihre Situation
                  abgestimmt. Wir sind die Brücke zwischen vollständiger Selbstständigkeit und professioneller Pflege – für
                  alle, die im Alltag Unterstützung brauchen, ohne in ein Pflegeheim wechseln zu müssen.
                </p>
                <p>
                  <strong>Gut Begleitet</strong> ist ein 2026 gegründeter, eingetragener <strong>Non-Profit-Verein</strong>. Ein
                  Teil unserer Begleiter:innen sind ukrainische Geflüchtete, denen wir über unsere Arbeit ein geregeltes
                  Einkommen, Versicherung, ergänzende Deutschkurse, einen Erste-Hilfe-Kurs und Integration ermöglichen – Sie
                  unterstützen also nicht nur sich selbst oder Ihre Angehörigen, sondern auch diesen Weg in ein neues Leben in
                  Österreich.
                </p>
              </div>

              <blockquote className="mt-8 border-l-4 border-orange pl-5">
                <p className="font-script text-3xl leading-snug text-teal sm:text-4xl">
                  „Wir nehmen uns Zeit für das, was wirklich zählt: Sie.“
                </p>
              </blockquote>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="/team copy.jpg"
                alt="Betreuerin und Seniorin in vertrauensvollem Gespräch"
                className="aspect-[4/3] w-full object-cover"
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={highlights.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {highlights.items.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-3xl border p-8 ${
                  index % 2 === 0
                    ? "border-teal/15 bg-teal-light/40"
                    : "border-orange/15 bg-orange-light/40"
                }`}
              >
                <h3 className="text-xl font-bold text-teal">{item.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-gray-700">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading title={forWhom.title} description={forWhom.text} />

          <div className="mt-8 rounded-2xl border border-grey-light bg-white/80 p-5 shadow-sm sm:p-6">
            <p className="text-base font-semibold text-teal">Registrierter Verein in Österreich</p>
            <p className="mt-2 text-sm text-gray-700">ZVR-Zahl: 1429148037</p>
            <a href="/impressum" className="mt-3 inline-flex text-sm font-semibold text-teal hover:text-teal-dark">
              Zum Impressum
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
