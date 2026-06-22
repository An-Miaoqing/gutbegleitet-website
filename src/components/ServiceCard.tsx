import { Link } from "react-router-dom";
import type { Service } from "../data/services";
import { ServiceIcon, ArrowRightIcon } from "./icons";

type ServiceCardProps = {
  service: Pick<Service, "id" | "title" | "shortDescription" | "icon" | "color">;
  compact?: boolean;
};

export default function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const bgClass = service.color === "teal" ? "bg-teal" : "bg-orange";

  return (
    <article className="flex flex-col rounded-3xl border border-grey-light bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full text-white ${bgClass}`}>
        <ServiceIcon name={service.icon} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-gray-900">{service.title}</h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-gray-700">{service.shortDescription}</p>
      {!compact && (
        <Link
          to={`/leistungen#${service.id}`}
          className="mt-5 inline-flex items-center gap-2 text-base font-bold text-teal hover:text-teal-dark"
        >
          Mehr erfahren
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </article>
  );
}
