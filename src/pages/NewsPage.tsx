import { Link } from "react-router-dom";
import { newsArticles, formatNewsDate } from "../data/news";
import PageHero from "../components/PageHero";
import CTABanner from "../components/CTABanner";
import { ArrowRightIcon } from "../components/icons";

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Aktuelles von Gut Begleitet"
        description="Neuigkeiten, Veranstaltungen und Informationen aus unserem Verein in Wien."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Add new articles to src/data/news.ts */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, index) => (
              <article
                key={article.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-grey-light bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-44 items-center justify-center ${
                    index === 0 ? "bg-teal-light" : index === 1 ? "bg-orange-light" : "bg-beige-dark"
                  }`}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full text-white ${
                      index % 2 === 0 ? "bg-teal" : "bg-orange"
                    }`}
                    aria-hidden="true"
                  >
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-bold ${
                        index % 2 === 0
                          ? "bg-teal-light text-teal"
                          : "bg-orange-light text-orange-dark"
                      }`}
                    >
                      {article.tag}
                    </span>
                    <time className="text-sm font-semibold text-grey-soft" dateTime={article.date}>
                      {formatNewsDate(article.date)}
                    </time>
                  </div>

                  <h2 className="mt-4 text-xl font-bold text-gray-900">{article.title}</h2>
                  <p className="mt-3 flex-1 text-base leading-relaxed text-gray-700">
                    {article.excerpt}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-gray-600">{article.content}</p>

                  <Link
                    to={`/news#${article.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-base font-bold text-teal hover:text-teal-dark"
                  >
                    Mehr erfahren
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
