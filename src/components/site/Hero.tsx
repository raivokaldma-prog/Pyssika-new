import { Link } from "react-router-dom";
import { A } from "./assets";

export function Hero() {
  return (
    <section className="relative overflow-x-clip">
      <div className="relative overflow-hidden bg-cellar-deep md:flex md:min-h-[360px] md:items-center lg:min-h-[395px]">
        {/* Scale uniformly to crop out the dark top/bottom/side vignette bands baked into Pyssslide1.jpg */}
        <img
          src={A.heroBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.38] object-cover object-center"
        />
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1160px] px-4 py-10 md:py-8 lg:px-6">
          <div className="max-w-[540px]">
            <h1 className="font-display text-[28px] leading-[1.14] text-parchment text-shadow-cellar sm:text-[38px] lg:text-[44px]">
              Ainulaadne õllerestoran
              <br />
              otse Tartu kesklinnas
            </h1>
            <p className="hero-subtitle mt-3 font-display text-[15px] italic text-shadow-cellar sm:text-[18px]">
              Üle 300 aasta vanused kivivõlvid on 10,2m kõrgused.
            </p>
            <p className="mt-4 max-w-[460px] text-[14px] leading-relaxed text-parchment/95 text-shadow-cellar sm:text-[15px]">
              Püssirohukelder pakub lisaks ainulaadsele menüüle uskumatut elamust.
              Põnev sisearhitektuur viib sind ajas tagasi, eemale igapäeva
              rutiinist. Tule veendu selles ise.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                to="/menuu"
                className="inline-flex min-h-[44px] items-center bg-primary px-6 py-2.5 font-display text-[15px] tracking-wide text-primary-foreground shadow-[0_4px_14px_rgba(0,0,0,0.5)] transition-colors hover:bg-primary/85"
              >
                Tutvu menüüga &gt;&gt;
              </Link>
              <Link
                to="/programm"
                className="inline-flex min-h-[40px] items-center text-[14px] italic text-parchment underline decoration-brass/80 underline-offset-4 transition-colors hover:text-brass"
              >
                - või vaata programmi
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Foreground platter — mathematically anchored to the server's hands across all desktop/tablet widths, hidden on mobile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 hidden md:block"
        style={{ containerType: "size" }}
      >
        <img
          src={A.platter}
          alt=""
          className="absolute bottom-0 -translate-x-1/2 translate-y-[32%] drop-shadow-[0_18px_24px_rgba(0,0,0,0.55)]"
          style={{
            left: "calc(50% + max(100cqw, 356.215cqh) * 0.272)",
            width: "calc(max(100cqw, 356.215cqh) * 0.215)",
          }}
        />
      </div>
    </section>
  );
}
