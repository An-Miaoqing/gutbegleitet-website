import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function ImpressumPage() {
  return (
    <>
      <PageHero title="Impressum" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-grey-light bg-white p-8 shadow-sm sm:p-10 lg:p-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-teal">Gut begleitet – Verein für Alltagshilfe für Senior:innen</h2>
                <div className="mt-4 space-y-2 text-lg leading-relaxed text-gray-700">
                  <p>
                    <span className="font-semibold text-gray-900">ZVR-Zahl:</span> 1429148037
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Vereinssitz:</span> Wien, Österreich
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Zustellanschrift:</span>
                    <br />
                    Bösendorferstraße 4/24/180
                    <br />
                    1010 Wien
                    <br />
                    Österreich
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Telefon:</span> [placeholder]
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">E-Mail:</span> [placeholder]
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900">Vertretungsberechtigte Person:</span> [placeholder]
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-orange/20 bg-orange-light/30 p-6">
                <h3 className="text-lg font-bold text-teal">Haftungsausschluss</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-700">
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
                </p>
              </div>
            </div>

            <Link
              to="/"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-teal px-8 py-4 text-lg font-bold text-white transition-colors hover:bg-teal-dark"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
