import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

type LegalPageProps = {
  title: string;
  type: "impressum" | "datenschutz";
};

export default function LegalPage({ title, type }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose-lg space-y-6 text-lg leading-relaxed text-gray-700">
            {type === "impressum" ? (
              <>
                <p>
                  <strong className="text-gray-900">Gut begleitet – Alltagshilfe für Senioren</strong>
                  <br />
                  Bösendorferstraße 4/24/180
                  <br />
                  1010 Wien, Österreich
                </p>
                <p>
                  Telefon: +43 681 1019 4236
                  <br />
                  E-Mail: gutbegleitetwien@gmail.com
                </p>
                <p>
                  Diese Seite dient als Platzhalter für das vollständige Impressum. Bitte ergänzen
                  Sie die rechtlich erforderlichen Angaben vor dem Live-Gang der Website.
                </p>
              </>
            ) : (
              <>
                <p>
                  Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung
                  informiert Sie über die Verarbeitung personenbezogener Daten im Rahmen unserer
                  Website und unserer Dienstleistungen.
                </p>
                <p>
                  Diese Seite dient als Platzhalter für die vollständige Datenschutzerklärung.
                  Bitte ergänzen Sie die rechtlich erforderlichen Inhalte vor dem Live-Gang der
                  Website.
                </p>
              </>
            )}
          </div>
          <Link
            to="/"
            className="mt-10 inline-flex items-center justify-center rounded-full bg-teal px-8 py-4 text-lg font-bold text-white hover:bg-teal-dark"
          >
            Zur Startseite
          </Link>
        </div>
      </section>
    </>
  );
}
