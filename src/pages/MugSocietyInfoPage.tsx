import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";

export function MugSocietyInfoPage() {
  useEffect(() => {
    document.title = "Kannumeeste Seltsi lisainfo – Püssirohukelder";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Compact dark cellar hero matching all subpages */}
        <section className="relative overflow-hidden bg-cellar-deep">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: `url(${A.mugGallery[2]})` }}
          />
          <div className="absolute inset-0 bg-cellar-deep/75" />
          <div className="relative mx-auto max-w-[1160px] px-4 pt-8 pb-10 md:pt-9 md:pb-12 lg:px-6">
            <nav
              className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-[0.16em] text-parchment/80"
              aria-label="Asukoht lehel"
            >
              <Link to="/" className="transition-colors hover:text-brass">
                Avaleht
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <Link
                to="/kannumeestele"
                className="transition-colors hover:text-brass"
              >
                Kannumeestele
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span aria-current="page" className="text-brass">
                Lisainfo
              </span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Traditsioon aastast 2006
            </p>
            <h1 className="mt-2 max-w-[780px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Hea tulevane Kannumeeste Seltsi liige!
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Tutvu Kannumeeste Seltsi eeliste, liikmelisuse reeglite ja
              liitumistingimustega.
            </p>
          </div>
        </section>

        {/* Repeating parchment body */}
        <div
          className="relative"
          style={{
            backgroundImage: `url(${A.paper})`,
            backgroundRepeat: "repeat",
          }}
        >
          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_340px] lg:items-start">
              {/* Main content column */}
              <div>
                <div className="space-y-5 text-[16px] leading-7 text-foreground/85">
                  <p>
                    Kui Katariina II andis 18. sajandil käsu Tartu
                    kindlustamiseks, polnud tal vaevalt aimugi sellest, et kaks
                    ja pool sajandit hiljem on Tartu püssirohu hoidmiseks
                    mõeldud hoones end sisse seadnud populaarne
                    kõrts/õllerestoran.
                  </p>
                  <p>
                    2006. aasta suvel panime siin aluse uuele traditsioonile –{" "}
                    <Link
                      to="/kannumeestele"
                      className="font-semibold text-primary underline decoration-primary/45 underline-offset-4 transition-colors hover:text-accent"
                    >
                      Kannumeeste Seltsile
                    </Link>
                    . Nüüdsest on sul võimalik kuuluda ainulaadsesse seltsi ning
                    nautida parimaid õllesid omanimelisest kannust!
                  </p>
                </div>

                {/* Member benefits */}
                <div className="mt-10 border-t border-border pt-8">
                  <h2 className="font-display text-[24px] leading-snug text-accent sm:text-[28px]">
                    Kuuluvus Kannumeeste Seltsi annab Sulle mitmeid eeliseid:
                  </h2>

                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3.5 border-b border-border/70 pb-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <p className="text-[16px] leading-7 text-foreground/85">
                        Oma kannu kõikide Saku vaadiõllede tellimisel liitri
                        hind <strong className="font-semibold text-accent">5 €</strong>.
                      </p>
                    </li>
                    <li className="flex items-start gap-3.5 border-b border-border/70 pb-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <p className="text-[16px] leading-7 text-foreground/85">
                        Kõikidele{" "}
                        <Link
                          to="/programm"
                          className="font-semibold text-primary underline decoration-primary/45 underline-offset-4 transition-colors hover:text-accent"
                        >
                          Püssirohukeldri
                        </Link>{" "}
                        pidudele sissepääs tasuta (v.a. eriüritused).
                      </p>
                    </li>
                  </ul>
                </div>

                {/* NB! Rules box */}
                <div className="mt-9 border border-border bg-secondary/50 p-6 sm:p-7">
                  <div className="flex items-center gap-2.5 text-accent">
                    <AlertCircle
                      className="h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <h2 className="font-display text-[20px] font-semibold">
                      NB! Oluline meelespea
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3 text-[15px] leading-7 text-foreground/85">
                    <li>
                      * Püssirohukeldril on õigus peatada Kannumeeste Seltsi
                      liikme staatus koheselt, kui Kannumees kuritarvitab talle
                      omistatud privileege.
                    </li>
                    <li>
                      * Kannumees vastutab isiklikult omanimelise kannu eest
                      selle kasutamise ajal. Kannumeeste Seltsi liikmekaart
                      kehtib koos isikut tõendava dokumendiga.
                    </li>
                  </ul>
                </div>

                {/* Primary CTA */}
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-none px-7 font-display text-[15px]"
                  >
                    <Link to="/kannumeeste-seltsiga-liitumine">
                      Esita taotlus läbi interneti{" "}
                      <ChevronRight aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-12 rounded-none border-accent/50 bg-transparent px-6 font-display text-[15px] text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link to="/kannumeestele">Tagasi seltsi lehele</Link>
                  </Button>
                </div>
              </div>

              {/* Right sidebar: Emblem + quick contact */}
              <aside className="space-y-7">
                <div className="border border-border bg-background/85 p-6 text-center">
                  <img
                    src={A.mugSociety}
                    alt="Kannumeeste Seltsi embleem ja nimelised õllekannud"
                    className="mx-auto w-full max-w-[260px] drop-shadow-[0_14px_20px_rgba(0,0,0,0.24)]"
                  />
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Ühekordne liitumistasu
                    </p>
                    <p className="mt-1 font-display text-[32px] font-semibold tabular-nums text-primary">
                      150 €
                    </p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                      Omanimeline kann ja igavesed soodustused.
                    </p>
                  </div>
                </div>

                <div className="border border-brass/35 bg-cellar-deep p-6 text-parchment">
                  <p className="font-display text-xs uppercase tracking-[0.22em] text-brass">
                    Küsimuste korral
                  </p>
                  <div className="mt-4 space-y-2 text-[14px]">
                    <a
                      href="tel:+3727303555"
                      className="flex min-h-[36px] items-center gap-2.5 font-display text-[17px] text-brass transition-colors hover:text-parchment"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      +372 7 303 555
                    </a>
                    <a
                      href="mailto:pyss@pyss.ee"
                      className="flex min-h-[36px] items-center gap-2.5 text-parchment/85 transition-colors hover:text-brass"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      pyss@pyss.ee
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      <HistoryFooter />
    </div>
  );
}
