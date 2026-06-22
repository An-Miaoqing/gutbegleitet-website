type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
};

export default function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="bg-teal-light pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="text-base font-bold uppercase tracking-wider text-orange">{eyebrow}</p>
          )}
          <h1 className="mt-2 text-3xl font-extrabold text-teal sm:text-4xl lg:text-5xl">{title}</h1>
          {description && (
            <p className="mt-5 text-xl leading-relaxed text-gray-700">{description}</p>
          )}
        </div>
      </div>
    </section>
  );
}
