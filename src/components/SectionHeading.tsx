type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p className={`text-base font-bold uppercase tracking-wider ${light ? "text-orange-light" : "text-orange"}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-2 text-3xl font-extrabold sm:text-4xl ${light ? "text-white" : "text-teal"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-xl leading-relaxed ${light ? "text-white/90" : "text-gray-700"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
