import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
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

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

          <div
            role="group"
            aria-label="Keelevalik"
            className="hidden shrink-0 items-center gap-1 border-l border-brass/30 pl-3 text-[13px] uppercase tracking-widest md:flex"
          >
            <button
              type="button"
              aria-pressed="true"
              aria-label="EST – eesti keel"
              className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center px-1.5 font-semibold text-brass cursor-pointer"
            >
              Est
            </button>
            <span aria-hidden="true" className="text-parchment/40">
              |
            </span>
            <button
              type="button"
              aria-pressed="false"
              aria-label="ENG – English"
              lang="en"
              className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center px-1.5 text-parchment/80 transition-colors hover:text-brass cursor-pointer"
            >
              Eng
            </button>
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
              className="flex gap-2 pt-3 text-xs uppercase tracking-widest md:hidden"
            >
              <button
                type="button"
                aria-pressed="true"
                aria-label="EST – eesti keel"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-semibold text-brass"
              >
                Est
              </button>
              <button
                type="button"
                aria-pressed="false"
                aria-label="ENG – English"
                lang="en"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-parchment/80"
              >
                Eng
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
