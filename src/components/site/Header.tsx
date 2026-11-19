import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { A } from "./assets";

const NAV = [
  { label: "Menüü", to: "/menuu" as const },
  { label: "Programm", to: "/programm" as const },
  { label: "Gruppidele", to: "/gruppidele" as const },
  { label: "Kannumeestele", to: "/kannumeestele" as const },
  { label: "Galerii", to: "/galerii" as const },
  { label: "Broneeri", to: "/broneeri" as const },
  { label: "Kontakt", to: "/kontakt" as const },
];

type LangCode = "et" | "en";

const LANGUAGES: { code: LangCode; label: string; ariaLabel: string }[] = [
  { code: "et", label: "Eesti", ariaLabel: "Eesti keel" },
  { code: "en", label: "English", ariaLabel: "English" },
];

function FlagIcon({ code, className = "h-[15px] w-[22px]" }: { code: LangCode; className?: string }) {
  if (code === "et") {
    return (
      <svg
        viewBox="0 0 33 21"
        aria-hidden="true"
        className={`shrink-0 rounded-[2px] ring-1 ring-white/25 ${className}`}
      >
        <rect width="33" height="7" y="0" fill="#0072CE" />
        <rect width="33" height="7" y="7" fill="#000000" />
        <rect width="33" height="7" y="14" fill="#FFFFFF" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 60 36"
      aria-hidden="true"
      className={`shrink-0 rounded-[2px] ring-1 ring-white/25 ${className}`}
    >
      <rect width="60" height="36" fill="#012169" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="3.2" />
      <path d="M30,0 V36 M0,18 H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("et");
  const [langOpen, setLangOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const langContainerRef = useRef<HTMLDivElement>(null);

  const activeLanguage =
    LANGUAGES.find((item) => item.code === lang) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!langOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangOpen(false);
        langButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if (
        langContainerRef.current &&
        !langContainerRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [langOpen]);

  const selectLanguage = (code: LangCode) => {
    setLang(code);
    setLangOpen(false);
    langButtonRef.current?.focus();
  };

  return (
    <header className="relative z-30">
      {/* WCAG 2.4.1 Bypass Blocks: Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:text-primary-foreground focus:shadow-lg"
      >
        Liigu põhisisu juurde
      </a>

      <div
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.10 0.014 45) 0%, oklch(0.24 0.034 45) 45%, oklch(0.19 0.028 45) 100%)",
          boxShadow: "0 2px 10px rgb(0 0 0 / 0.55)",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1160px] items-center gap-4 px-4 md:h-[86px] lg:px-6">
          {/* Logo composition — intentionally overflows the header bar */}
          <Link
            to="/"
            className="relative block shrink-0"
            aria-label="Püssirohukelder – avaleht"
          >
            <span className="relative block h-[86px] w-[132px] md:h-[112px] md:w-[172px]">
              <img
                src={A.logoPlate}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-fill drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]"
              />
              <img
                src={A.logoText}
                alt="Püssirohukelder"
                className="absolute left-1/2 top-[46%] w-[86%] -translate-x-1/2 -translate-y-1/2"
              />
            </span>
          </Link>

          <p className="min-w-0 flex-1 font-display text-[13px] italic tracking-wide text-brass md:text-[17px]">
            Maailma kõrgeim õllerestoran
          </p>

          <nav
            aria-label="Põhimenüü"
            className="hidden items-center gap-4 lg:flex"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex min-h-[40px] items-center px-1 font-display text-[15px] transition-colors hover:text-brass ${
                    isActive
                      ? "text-brass underline decoration-brass/70 underline-offset-4"
                      : "text-parchment/90"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Compact single-flag language dropdown */}
          <div
            ref={langContainerRef}
            className="relative hidden shrink-0 border-l border-brass/30 pl-3 md:block"
          >
            <button
              ref={langButtonRef}
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="menu"
              aria-controls="header-lang-menu"
              aria-label={`Keelevalik: ${activeLanguage.ariaLabel}`}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-sm px-2 text-parchment/90 transition-colors hover:bg-white/5 hover:text-brass cursor-pointer"
            >
              <FlagIcon code={activeLanguage.code} />
              <ChevronDown
                aria-hidden="true"
                className={`h-3.5 w-3.5 text-brass/90 transition-transform duration-150 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div
                id="header-lang-menu"
                role="menu"
                aria-label="Vali keel"
                className="absolute right-0 top-full z-40 mt-2 min-w-[144px] border border-brass/35 bg-cellar-deep py-1 shadow-[0_12px_28px_rgba(0,0,0,0.6)]"
              >
                {LANGUAGES.map((item) => {
                  const isActive = item.code === lang;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      lang={item.code}
                      onClick={() => selectLanguage(item.code)}
                      className={`flex min-h-[40px] w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[14px] transition-colors cursor-pointer ${
                        isActive
                          ? "bg-white/8 font-semibold text-brass"
                          : "text-parchment/90 hover:bg-white/5 hover:text-brass"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <FlagIcon code={item.code} />
                        <span>{item.label}</span>
                      </span>
                      {isActive && (
                        <Check
                          className="h-3.5 w-3.5 shrink-0 text-brass"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Sulge menüü" : "Ava menüü"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-brass/40 text-brass lg:hidden cursor-pointer"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.19 0.028 45) 0%, oklch(0.12 0.016 45) 100%)",
          }}
        >
          <nav
            aria-label="Mobiilimenüü"
            className="mx-auto flex max-w-[1160px] flex-col px-4 pb-4"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-[44px] items-center border-b border-brass/20 py-3 font-display text-base ${
                    isActive ? "text-brass" : "text-parchment/95"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div
              role="group"
              aria-label="Keelevalik"
              className="flex items-center gap-3 pt-3 md:hidden"
            >
              {LANGUAGES.map((item) => {
                const isActive = item.code === lang;
                return (
                  <button
                    key={item.code}
                    type="button"
                    aria-pressed={isActive}
                    lang={item.code}
                    onClick={() => setLang(item.code)}
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors cursor-pointer ${
                      isActive
                        ? "border-brass/60 bg-white/8 font-semibold text-brass"
                        : "border-brass/20 text-parchment/85 hover:border-brass/40 hover:text-brass"
                    }`}
                  >
                    <FlagIcon code={item.code} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
