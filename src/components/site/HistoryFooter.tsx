import { Link } from "react-router-dom";
import { A } from "./assets";

const YEARS = [
  {
    year: "1778",
    text: " – valmis Püssirohukelder. Seest ligi 11m kõrgune ehitis on Tartu insenerikomando poolt rajatutest ainus, mis on tänaseni säilinud.",
  },
  {
    year: "1827",
    text: " – sõlmiti rendileping kaupmees J.R. Schrammiga kelle ettevõte seda õllekeldrina 69 aastat kasutas.",
  },
  {
    year: "1982",
    text: " – avati siin populaarne kohvik-restoran, mis töötas kuni 1999 aastani.",
  },
  {
    year: "2000",
    text: ". aasta novembris avati peale pikki restaureerimistöid taas Püssirohukelder, seekord õllerestoranina.",
    hasMore: true,
  },
];

export function HistoryFooter() {
  return (
    <>
      <section
        aria-label="Püssirohukeldri ajalugu"
        className="relative border-t border-cellar-deep/35 bg-cover bg-center"
        style={{ backgroundImage: `url(${A.timelineBg})` }}
      >
        <div className="relative z-10 mx-auto max-w-[1160px] px-4 pt-2 pb-6 lg:px-6">
          <img
            src={A.scale}
            alt=""
            aria-hidden="true"
            className="mb-3 block h-4 w-full object-cover object-left opacity-80 sm:h-5"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {YEARS.map((y) => (
              <p
                key={y.year}
                className="text-[13.5px] leading-[1.55] text-[#140d07]"
              >
                <strong className="font-bold tabular-nums text-[#0d0804]">
                  {y.year}
                </strong>
                {y.text}
                {y.hasMore && (
                  <>
                    {" "}
                    <Link
                      to="/kontakt"
                      className="font-bold text-[#0d0804] underline decoration-[#0d0804]/60 underline-offset-2 transition-colors hover:text-primary"
                    >
                      Loe edasi…
                    </Link>
                  </>
                )}
              </p>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-cellar-deep">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-1 px-4 py-3 text-[13.5px] text-parchment/85 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <p>
            <Link
              to="/"
              className="font-display text-parchment transition-colors hover:text-brass"
            >
              Püssirohukelder
            </Link>{" "}
            - Lossi 28, Tartu, Tel.{" "}
            <a
              href="tel:+3727303555"
              className="underline decoration-parchment/40 underline-offset-4 transition-colors hover:text-brass"
            >
              +372 7 303 555
            </a>{" "}
            &nbsp;|&nbsp; Moonaladu OÜ
          </p>
          <a
            href="https://www.facebook.com/pyssirohukelder"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[36px] items-center underline decoration-parchment/40 underline-offset-4 transition-colors hover:text-brass"
          >
            Facebook
          </a>
        </div>
      </footer>
    </>
  );
}
