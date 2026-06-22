import { contact } from "../data/content";
import { PhoneIcon } from "./icons";

export default function ContactDetails({ light = false }: { light?: boolean }) {
  const labelClass = light ? "text-white/70" : "text-grey-soft";
  const valueClass = light ? "text-white hover:text-orange-light" : "text-gray-800 hover:text-teal";
  const textClass = light ? "text-white" : "text-gray-800";

  return (
    <ul className="space-y-6">
      <li className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${light ? "bg-white/15 text-white" : "bg-teal-light text-teal"}`}>
          <PhoneIcon className="h-6 w-6" />
        </span>
        <div>
          <p className={`text-sm font-bold uppercase tracking-wide ${labelClass}`}>Telefon</p>
          <a href={contact.phoneHref} className={`mt-1 block text-xl font-bold ${valueClass}`}>
            {contact.phoneDisplay}
          </a>
        </div>
      </li>

      <li className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${light ? "bg-white/15 text-white" : "bg-teal-light text-teal"}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </span>
        <div>
          <p className={`text-sm font-bold uppercase tracking-wide ${labelClass}`}>E-Mail</p>
          <a href={contact.emailHref} className={`mt-1 block text-lg font-bold break-all ${valueClass}`}>
            {contact.email}
          </a>
        </div>
      </li>

      <li className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${light ? "bg-white/15 text-white" : "bg-teal-light text-teal"}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        </span>
        <div>
          <p className={`text-sm font-bold uppercase tracking-wide ${labelClass}`}>Adresse</p>
          <p className={`mt-1 text-lg font-bold ${textClass}`}>{contact.address}</p>
          <p className={`text-lg font-bold ${textClass}`}>{contact.city}</p>
        </div>
      </li>

      <li className="flex items-start gap-4">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${light ? "bg-white/15 text-white" : "bg-teal-light text-teal"}`}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        <div>
          <p className={`text-sm font-bold uppercase tracking-wide ${labelClass}`}>Erreichbarkeit</p>
          <p className={`mt-1 text-lg font-bold ${textClass}`}>{contact.hours}</p>
        </div>
      </li>
    </ul>
  );
}

export function MapPlaceholder() {
  return (
    <div
      className="flex h-72 items-center justify-center rounded-3xl border-2 border-dashed border-grey-light bg-beige-dark sm:h-96"
      role="img"
      aria-label="Karte: Standort Gut begleitet in Wien"
    >
      <div className="text-center px-6">
        <svg className="mx-auto h-12 w-12 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <p className="mt-4 text-lg font-bold text-teal">Google Maps</p>
        <p className="mt-1 text-base text-grey-soft">{contact.fullAddress}</p>
        <p className="mt-3 text-sm text-grey-soft">Kartenintegration folgt</p>
      </div>
    </div>
  );
}
