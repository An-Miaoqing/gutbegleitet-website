import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function DatenschutzPage() {
  return (
    <>
      <PageHero title="Datenschutzerklärung" />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-grey-light bg-white p-8 shadow-sm sm:p-10 lg:p-12">
            <div className="space-y-8 text-lg leading-relaxed text-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-teal">1. Verantwortlicher</h2>
                <p className="mt-4">
                  Gut begleitet – Verein für Alltagshilfe für Senior:innen
                  <br />
                  ZVR-Zahl: 1429148037
                  <br />
                  Bösendorferstraße 4/24/180
                  <br />
                  1010 Wien
                  <br />
                  Österreich
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-teal">2. Erhebung personenbezogener Daten</h2>
                <p className="mt-4">
                  Im Rahmen unserer Website und unserer Dienstleistung können personenbezogene Daten erhoben werden, insbesondere Name, Telefonnummer, E-Mail-Adresse, Adresse sowie Informationen aus dem Kontaktformular und aus Terminanfragen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-teal">3. Zweck der Verarbeitung</h2>
                <p className="mt-4">
                  Die erhobenen Daten werden ausschließlich zur Kontaktaufnahme, zur Bearbeitung von Terminanfragen, zur Organisation der Dienstleistungen sowie zur Kommunikation mit Interessenten und Mitgliedern verarbeitet.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-teal">4. Speicherung</h2>
                <p className="mt-4">
                  Personendaten werden nur so lange gespeichert, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorsehen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-teal">5. Weitergabe an Dritte</h2>
                <p className="mt-4">
                  Wir verkaufen Ihre Daten nicht und geben sie nur weiter, wenn dies gesetzlich zulässig oder erforderlich ist.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-teal">6. Rechte der betroffenen Personen</h2>
                <p className="mt-4">
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Für Anfragen wenden Sie sich bitte an uns über die unten angegebene Kontaktmöglichkeit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-teal">7. Kontakt</h2>
                <p className="mt-4">
                  Telefon: [placeholder]
                  <br />
                  E-Mail: [placeholder]
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
