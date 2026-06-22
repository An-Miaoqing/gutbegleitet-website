import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { navLinks } from "../data/content";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-grey-light bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 rounded-lg" aria-label="Gut begleitet – Startseite">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-lg px-3 py-2.5 text-base font-semibold transition-colors ${
                location.pathname === link.href
                  ? "bg-teal-light text-teal"
                  : "text-gray-700 hover:bg-teal-light hover:text-teal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 xl:block">
          <Link
            to="/beratung"
            className="inline-flex items-center rounded-full bg-orange px-5 py-3 text-base font-bold text-white shadow-md shadow-orange/25 transition-all hover:bg-orange-dark"
          >
            Kostenlose Erstberatung
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-teal xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-grey-light bg-white px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`rounded-xl px-4 py-3.5 text-lg font-semibold ${
                  location.pathname === link.href
                    ? "bg-teal-light text-teal"
                    : "text-gray-800 hover:bg-teal-light hover:text-teal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/beratung"
              className="mt-2 flex items-center justify-center rounded-full bg-orange px-5 py-4 text-lg font-bold text-white"
            >
              Kostenlose Erstberatung
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
