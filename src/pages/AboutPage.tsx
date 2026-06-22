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
        description={welcome.intro}
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading align="left" title={mission.title} />
              <p className="mt-6 text-lg leading-relaxed text-gray-700">{mission.text}</p>

              <blockquote className="mt-8 border-l-4 border-orange pl-5">
                <p className="font-script text-3xl leading-snug text-teal sm:text-4xl">
                  „Wir nehmen uns Zeit für das, was wirklich zählt: Sie.“
                </p>
              </blockquote>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
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
        </div>
      </section>

      <CTABanner />
    </>
  );
}
