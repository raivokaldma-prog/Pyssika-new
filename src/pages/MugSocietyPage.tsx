import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";

const BENEFITS = [
  "Saku vaadiõllede tellimisel on liitri hind vaid 5 €.",
  "Tasuta sissepääs kõikidele Püssirohukeldri üritustele, välja arvatud eriüritused, näiteks teatrietendused.",
  "Pidevalt uus ja värske info Püssirohukeldris toimuva kohta.",
];

export function MugSocietyPage() {
  useEffect(() => {
    document.title = "Kannumeeste Selts – Püssirohukelder";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <section className="relative overflow-hidden bg-cellar-deep">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: `url(${A.mugGallery[0]})` }}
          />
          <div className="absolute inset-0 bg-cellar-deep/75" />
          <div className="relative mx-auto max-w-[1160px] px-4 pt-8 pb-10 md:pt-9 md:pb-12 lg:px-6">
            <nav
              className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-parchment/80"
              aria-label="Asukoht lehel"
            >
              <Link to="/" className="transition-colors hover:text-brass">
                Avaleht
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span aria-current="page" className="text-brass">Kannumeestele</span>
            </nav>
            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Püssirohukeldri auväärne selts
            </p>
            <h1 className="mt-2 max-w-[720px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Kannumeeste Selts
            </h1>
            <p className="mt-3 max-w-[620px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Omanimeline kann, head õlletraditsioonid ja privileegid, millest
              saavad osa vaid vähesed.
            </p>
          </div>
        </section>

        <div
          className="relative"
          style={{
            backgroundImage: `url(${A.paper})`,
            backgroundRepeat: "repeat",
          }}
        >
          <section className="mx-auto grid max-w-[1160px] gap-10 px-4 py-14 md:grid-cols-[minmax(0,1fr)_340px] md:items-center md:py-20 lg:px-6">
            <div>
              <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                Mis on Kannumeeste Selts?
              </p>
              <h2 className="mt-3 max-w-[680px] font-display text-[28px] leading-snug text-accent md:text-[36px]">
                Selts neile, kes peavad lugu heast õllekultuurist
              </h2>
              <p className="mt-5 max-w-[700px] text-[16px] leading-7 text-foreground/80">
                Kannumeeste Seltsi kuuluvad kõik õllesõbrad, kes omavad
                Püssirohukeldris omanimelist kannu. See on ainulaadne privileeg,
                millest saavad osa vaid vähesed.
              </p>
              <div className="mt-8 space-y-4">
                {BENEFITS.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex gap-3 border-b border-border/70 pb-4"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="text-[15px] leading-6 text-foreground/80">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={A.mugSociety}
              alt="Kannumeeste Seltsi embleem ja nimelised õllekannud"
              className="mx-auto w-full max-w-[340px] drop-shadow-[0_18px_25px_rgba(0,0,0,0.28)]"
            />
          </section>

          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto grid max-w-[1160px] gap-8 px-4 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-14 lg:px-6">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.25em] text-brass">
                  Sinu kann ootab
                </p>
                <h2 className="mt-3 max-w-[720px] font-display text-[27px] leading-snug md:text-[34px]">
                  Tahaksid Kannumeeste Seltsi kuuluda?
                </h2>
                <p className="mt-3 max-w-[680px] text-[15px] leading-6 text-parchment/85">
                  Registreeru internetis või küsi liitumisankeet Püssirohukeldri
                  teenindajalt.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none px-7 font-display text-[15px]"
              >
                <a
                  href="https://pyss.ee/kannumeeste-selts/kannumeeste-seltsiga-liitumine"
                  target="_blank"
                  rel="noreferrer"
                >
                  Esita taotlus <ChevronRight aria-hidden="true" />
                </a>
              </Button>
            </div>
          </section>

          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="grid gap-10 md:grid-cols-3 md:gap-0">
              <article className="md:border-r md:border-border md:pr-8">
                <p className="font-display text-[13px] uppercase tracking-[0.2em] text-primary">
                  Kes saavad liituda?
                </p>
                <h2 className="mt-3 font-display text-[23px] text-accent">
                  Kõik õllesõbrad
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-muted-foreground">
                  Absoluutselt kõik, kes peavad lugu heast õllekultuurist ning
                  soovivad kuuluda Püssirohukeldri ainulaadsesse seltsi.
                </p>
              </article>
              <article className="md:border-r md:border-border md:px-8">
                <p className="font-display text-[13px] uppercase tracking-[0.2em] text-primary">
                  Kuulsad liikmed
                </p>
                <h2 className="mt-3 font-display text-[23px] text-accent">
                  Heas seltskonnas
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-muted-foreground">
                  Seltsi ligi 1500 liikme seas on Lennart Meri, Arnold Rüütel,
                  Tõnis Mägi, Neinar Seli ja palju teisi tuntud nimesid.
                </p>
              </article>
              <article className="md:pl-8">
                <p className="font-display text-[13px] uppercase tracking-[0.2em] text-primary">
                  Liitumine
                </p>
                <h2 className="mt-3 font-display text-[32px] text-accent">
                  150 €
                </h2>
                <p className="mt-2 text-[14px] leading-6 text-muted-foreground">
                  Saad enda nimelise kannu ja igavesed soodustused. Umbes 12
                  külastusega on investeering end tagasi teeninud.
                </p>
              </article>
            </div>

            <div className="mt-14 border-y border-border py-7 md:flex md:items-center md:gap-10">
              <p className="font-display text-[21px] text-accent">
                Kannumeeste Seltsis on hetkel{" "}
                <strong className="text-[28px] font-semibold text-primary">
                  1478
                </strong>{" "}
                liiget
              </p>
              <div
                role="progressbar"
                aria-valuenow={85}
                aria-valuemin={0}
                aria-valuemax={100}
                className="mt-4 h-2 flex-1 bg-border/70 md:mt-0"
                aria-label="Kannumeeste Seltsi täituvus 85 protsenti"
              >
                <div className="h-full w-[85%] bg-primary" />
              </div>
              <span className="mt-2 block font-display text-[18px] text-primary md:mt-0">
                85%
              </span>
            </div>
          </section>

          <section className="mx-auto max-w-[1160px] px-4 pb-24 lg:px-6">
            <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                  Seltsi kannud
                </p>
                <h2 className="mt-2 font-display text-[27px] text-accent md:text-[32px]">
                  Igal liikmel on oma lugu
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {A.mugGallery.map((image, index) => (
                <figure
                  key={image}
                  className="overflow-hidden border border-border bg-cellar-deep p-1.5"
                >
                  <img
                    src={image}
                    alt={`Kannumeeste Seltsi liikmete nimelised kannud ${index + 1}`}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </figure>
              ))}
            </div>
            <p className="mt-5 max-w-[760px] font-display text-[15px] italic leading-6 text-muted-foreground">
              Piltidel olevad kannud on Kannumeeste Seltsi liikmete omad. See on
              märk heast õllest ja atmosfäärist.
            </p>
          </section>
        </div>
      </main>
      <HistoryFooter />
    </div>
  );
}
