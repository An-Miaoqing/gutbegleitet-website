type LogoProps = {
  className?: string;
  showText?: boolean;
};

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt="Gut begleitet Logo"
        className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16"
        width={64}
        height={64}
      />
      {showText && (
        <div className="min-w-0 hidden sm:block">
          <p className="text-xl font-extrabold leading-tight sm:text-2xl">
            <span className="text-orange">Gut </span>
            <span className="text-teal">begleitet</span>
          </p>
          <p className="text-xs font-semibold text-teal sm:text-sm">Alltagshilfe für Senioren</p>
        </div>
      )}
    </div>
  );
}
