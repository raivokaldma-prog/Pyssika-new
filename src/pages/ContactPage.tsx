import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Calendar,
  Car,
  ChevronRight,
  Clock3,
  ExternalLink,
  Landmark,
  Mail,
  MapPin,
  Phone,
  UtensilsCrossed,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";

const HERO_IMAGE = "/images/gallery/yldine/02-luqhj49b7c59e723e5pyss.jpg";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=P%C3%BCssirohukelder,+Lossi+28,+Tartu";
const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=P%C3%BCssirohukelder,+Lossi+28,+Tartu&t=&z=16&ie=UTF8&iwloc=&output=embed";

const ARCHITECTURAL_STATS = [
  { value: "250 m²", label: "Põhikelder" },
  { value: "163 m²", label: "Ümbritsev käik" },
  { value: "33 m²", label: "Eelkelder" },
  { value: "> 10 m", label: "Võlvide kõrgus" },
  { value: "~2,5 m", label: "Keldriseinte paksus" },
  { value: "3 m", label: "Täitepinnas võlvidel" },
];

export function ContactPage() {
  useEffect(() => {
    document.title = "Kontakt ja asukoht – Püssirohukelder";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Atmospheric dark cellar hero matching subpages */}
        <section className="relative overflow-hidden bg-cellar-deep">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
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
              <span aria-current="page" className="text-brass">Kontakt</span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Lossi 28, Tartu
            </p>
            <h1 className="mt-2 max-w-[740px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Kontakt ja asukoht
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Asub Toomemäe kaldas, Raekoja taga Pirogovi pargis. Sissepääs Lossi
              tänava poolt.
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
          {/* Main contact + map split */}
          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
              {/* Left: Opening hours, direct contacts & company details */}
              <div className="space-y-8">
                {/* Opening hours */}
                <div className="border border-border bg-background/90 p-6 sm:p-7">
                  <div className="flex items-center gap-2.5 text-primary">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                    <p className="font-display text-[12px] uppercase tracking-[0.24em]">
                      Oleme avatud
                    </p>
                  </div>
                  <dl className="mt-5 space-y-3">
                    <div className="flex items-baseline justify-between border-b border-border/70 pb-3">
                      <dt className="font-display text-[18px] text-accent">
                        Pühapäev – Teisipäev (P–T)
                      </dt>
                      <dd className="font-display text-[20px] font-semibold tabular-nums text-primary">
                        12:00 – 22:00
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <dt className="font-display text-[18px] text-accent">
                        Kolmapäev – Laupäev (K–L)
                      </dt>
                      <dd className="font-display text-[20px] font-semibold tabular-nums text-primary">
                        12:00 – 01:00
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Direct contacts */}
                <div className="border border-border bg-background/90 p-6 sm:p-7">
                  <p className="font-display text-[12px] uppercase tracking-[0.24em] text-primary">
                    Võta ühendust
                  </p>
                  <h2 className="mt-1.5 font-display text-[25px] text-accent">
                    Kontaktandmed
                  </h2>

                  <ul className="mt-5 space-y-4 text-[15px]">
                    <li className="flex items-start gap-3.5 border-b border-border/70 pb-4">
                      <Phone
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Telefon
                        </p>
                        <a
                          href="tel:+3727303555"
                          className="mt-0.5 block font-display text-[20px] tabular-nums text-accent transition-colors hover:text-primary"
                        >
                          +372 7 303 555
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3.5 border-b border-border/70 pb-4">
                      <Mail
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Üldinfo ja lauabroneeringud
                        </p>
                        <a
                          href="mailto:pyss@pyss.ee"
                          className="mt-0.5 block font-display text-[18px] text-accent transition-colors hover:text-primary"
                        >
                          pyss@pyss.ee
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3.5 border-b border-border/70 pb-4">
                      <UtensilsCrossed
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Peolauad ja catering
                        </p>
                        <a
                          href="mailto:janis@pyss.ee"
                          className="mt-0.5 block font-display text-[18px] text-accent transition-colors hover:text-primary"
                        >
                          janis@pyss.ee
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3.5">
                      <MapPin
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Aadress
                        </p>
                        <p className="mt-0.5 font-display text-[18px] text-accent">
                          Lossi 28, Tartu, 51003
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                    <Button
                      asChild
                      size="lg"
                      className="h-11 rounded-none px-6 font-display text-[15px]"
                    >
                      <Link to="/broneeri">
                        <Calendar aria-hidden="true" /> Broneeri laud
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-11 rounded-none border-accent/50 bg-transparent px-5 font-display text-[15px] text-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      <a href="mailto:pyss@pyss.ee">Saada e-kiri</a>
                    </Button>
                  </div>
                </div>

                {/* Company / billing details */}
                <div className="border border-border bg-secondary/45 p-6">
                  <div className="flex items-center gap-2 text-primary">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    <p className="font-display text-[12px] uppercase tracking-[0.22em]">
                      Ettevõtte rekvisiidid
                    </p>
                  </div>
                  <dl className="mt-4 space-y-2 text-[14px]">
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="text-muted-foreground">Ettevõte</dt>
                      <dd className="font-semibold text-foreground">
                        Moonaladu OÜ
                      </dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="text-muted-foreground">Registrikood</dt>
                      <dd className="tabular-nums text-foreground">12303705</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="text-muted-foreground">Pank</dt>
                      <dd className="text-foreground">Swedbank AS</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="text-muted-foreground">Arveldusarve</dt>
                      <dd className="font-mono text-[13px] tabular-nums text-foreground">
                        EE702200221069507051
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Right: Location & Parking + Embedded Map */}
              <div className="space-y-6">
                <div className="border border-border bg-background/90 p-6 sm:p-7">
                  <p className="font-display text-[12px] uppercase tracking-[0.24em] text-primary">
                    Kuidas kohale jõuda
                  </p>
                  <h2 className="mt-1.5 font-display text-[25px] text-accent">
                    Asukoht ja parkimine
                  </h2>
                  <p className="mt-4 text-[15px] leading-7 text-foreground/85">
                    Püssirohukelder asub Toomemäe kaldas, Raekoja taga, Pirogovi
                    pargis. Sisse pääseb Püssirohukeldrisse Lossi tänava poolt.
                  </p>
                  <div className="mt-5 flex items-start gap-3 border-t border-border pt-4 text-[14px] leading-relaxed text-muted-foreground">
                    <Car
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <p>
                      Parkida saab nii Lossi tänaval kui Püssirohukeldri esisel
                      parklal.
                    </p>
                  </div>
                </div>

                {/* Map Frame */}
                <div className="border border-border bg-cellar-deep p-2 shadow-[0_14px_32px_rgba(0,0,0,0.2)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-cellar">
                    <iframe
                      title="Püssirohukelder asukoht kaardil – Lossi 28, Tartu"
                      src={GOOGLE_MAPS_EMBED_URL}
                      className="h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-3 pb-1 text-[13px] text-parchment/80">
                    <span>Lossi 28, 51003 Tartu</span>
                    <a
                      href={GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-display text-brass transition-colors hover:text-parchment"
                    >
                      Ava Google Mapsis{" "}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Architectural & historical facts band from live pyss.ee/kontakt/ */}
          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto max-w-[1160px] px-4 py-14 md:py-18 lg:px-6">
              <div className="flex items-center gap-2.5 text-brass">
                <Landmark className="h-5 w-5" aria-hidden="true" />
                <p className="font-display text-[13px] uppercase tracking-[0.25em]">
                  Arhitektuur ja ajalugu
                </p>
              </div>
              <h2 className="mt-3 max-w-[720px] font-display text-[28px] leading-snug md:text-[36px]">
                Huvitavaid fakte Püssirohukeldrist
              </h2>

              {/* Key architectural measurements */}
              <div className="mt-8 grid grid-cols-2 gap-px border border-brass/25 bg-brass/25 sm:grid-cols-3 lg:grid-cols-6">
                {ARCHITECTURAL_STATS.map((stat) => (
                  <div key={stat.label} className="bg-cellar-deep p-4">
                    <p className="font-display text-[24px] font-semibold tabular-nums text-brass">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-parchment/85">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 grid gap-8 md:grid-cols-2">
                <div className="space-y-4 text-[15px] leading-7 text-parchment/85">
                  <p>
                    Fassaadimüüritis kahe kaldkontraforsiga moodustab tugimüüri
                    kaldanõlva põhjaküljele. Püssirohukelder on ehitatud vanasse
                    linnusekraavi, mis lahutas kindlust eeskindlusest. Ehitamisel
                    kasutati lossikraavi vanad, paksud tugimüürid ära
                    külgseinteks.
                  </p>
                  <p>
                    Püssirohukeldri mõõtmed on suured: eelkeldri osa 33 m²,
                    põhikelder 250 m², seda ümbritsev käik 163 m². Mõlemat
                    keldrit sildav teravkaarne võlv on tipul üle 10 m kõrge.
                    Keldriseinte paksus on ligikaudu 2,5 m. Võlvide 3 m paksusel
                    täitepinnasel kasvavad puud ja on jalgteed, kaldanõlva
                    ääristab metallist kaitsepiire.
                  </p>
                </div>

                <div className="space-y-4 text-[15px] leading-7 text-parchment/85">
                  <p>
                    Püssirohukelder on muinsuskaitse all ning kuulub Tartu
                    linnale. Hoonet rendib linnalt{" "}
                    <strong className="font-semibold text-parchment">
                      OÜ Moonaladu
                    </strong>
                    .
                  </p>
                  <p>
                    Praeguse sisekujunduse autoriks on tuntud arhitekt{" "}
                    <strong className="font-semibold text-parchment">
                      Aivar Roosaar
                    </strong>
                    . Tema käe all on uuesti kujundatud veel näiteks Ammende
                    Villa Pärnus.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <HistoryFooter />
    </div>
  );
}
