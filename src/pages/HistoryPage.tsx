import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Images,
  X,
  ZoomIn,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { AccessibleModal } from "../components/site/AccessibleModal";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";
import { GALLERY_PHOTOS, type GalleryPhoto } from "../data/galleryItems";

const HERO_IMAGE = "/images/gallery/ajalugu/22-73030_457828514349_6821973_n.jpg";

const TIMELINE_EVENTS = [
  {
    year: "1700–1721",
    text: "Põhjasõda, mis oli Eesti ja Tartu jaoks murrangulise tähtsusega.",
  },
  {
    year: "1763",
    text: "Asuti Venemaa keisrinna Katariina II käsul Tartut uuesti kindlustama. Otsustati valmis ehitada ka kelder püssirohu hoidmiseks asukohaga endises linnusekraavis, mille pakse ja tugevaid seinu sobivalt keldri seinteks ära kasutada sai.",
  },
  {
    year: "1768",
    text: "Alustab kindralfeldmarssal de Villebois insenerikomando ehitustöid. Tellised toodi vana Maarja kiriku (u. praeguse ülikooli peahoone kohal) ja Toomemäel asunud piiskoplinnuse toonastest varemetest.",
  },
  {
    year: "1778",
    text: "Valmib Püssirohukelder. Seest ligi 11 m kõrgune ehitis on Tartu insenerikomando poolt rajatutest ainus, mis on tänaseni säilinud.",
  },
  {
    year: "1800",
    text: "Keiser Paul I kinkis Toomemäe koos kõigi ehitistega Tartu Ülikoolile.",
  },
  {
    year: "1809",
    text: "Viimased tosin tonni püssirohtu viiakse lõpuks, pärast pikka kirjavahetust Tartu rae, kindralkuberneri ja sõjaministri Riia voliniku vahel, ära Narva.",
  },
  {
    year: "1817",
    text: "On teada, et keldris hoiti ülikooli tõldu, tulekustutusvahendeid ja ehitusmaterjale.",
  },
  {
    year: "1827",
    text: "Sõlmiti rendileping kaupmees J. R. Schrammiga, kelle ettevõte seda õllekeldrina 69 aastat kasutas.",
  },
  {
    year: "1896",
    text: "Ülikool rakendab ruumi teadustööks – siia paigutatakse professor Lewitzky eestvõttel horisontaalpendel, et teha maavärisemise ja magneetiliste nähtuste vaatlusi.",
  },
  {
    year: "1915",
    text: "Keldrit kasutati üliõpilasköögi panipaigana, ka pärast II maailmasõda oli siin pikka aega juurviljaladu.",
  },
  {
    year: "1960",
    text: "Aastakümne algul viidi siin läbi arheoloogilisi kaevamisi ja valmistati ette Püssirohukeldri rekonstrueerimise projekt, et ehitist avalikku kasutusse võtta.",
  },
  {
    year: "1982",
    text: "Avati siin populaarne kohvik-restoran, mis töötas kuni 1999. aastani.",
  },
  {
    year: "2000",
    text: "Novembris avati peale pikki restaureerimistöid taas Püssirohukelder (legendaarne Tartu restoran), seekord õllerestoranina.",
  },
  {
    year: "Täna",
    text: "Loed sina seda teksti vanima kesklinna õllerestorani kohta – tule kohale ja tunneta ajalugu.",
  },
];

export function HistoryPage() {
  const historicalPhotos = useMemo(
    () => GALLERY_PHOTOS.filter((photo) => photo.category === "ajalugu"),
    [],
  );
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    document.title = "Püssirohukeldri ajalugu – Püssirohukelder";
  }, []);

  const selectedIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return historicalPhotos.findIndex((p) => p.id === selectedPhoto.id);
  }, [historicalPhotos, selectedPhoto]);

  const stepPhoto = (direction: -1 | 1) => {
    if (!selectedPhoto || historicalPhotos.length <= 1) return;
    const nextIdx =
      (selectedIndex + direction + historicalPhotos.length) %
      historicalPhotos.length;
    const next = historicalPhotos[nextIdx];
    if (next) setSelectedPhoto(next);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Compact dark cellar hero matching all subpages */}
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
              <span aria-current="page" className="text-brass">
                Ajalugu
              </span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              1700 – tänapäev
            </p>
            <h1 className="mt-2 max-w-[780px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Püssirohukeldril on üle 300 aasta ajalugu
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Tutvu Püssirohukeldri ajalooliste etappidega ja sirvi vanu
              arhiivifotosid.
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
          {/* Alternating vertical historical timeline matching live pyss.ee/ajalugu/ */}
          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                Ajaloolised etapid
              </p>
              <h2 className="mt-2 font-display text-[28px] leading-snug text-accent md:text-[36px]">
                Linnusekraavist maailma kõrgeima õllerestoranini
              </h2>
            </div>

            <div className="relative mt-12">
              {/* Vertical spine: left on mobile, centered on desktop */}
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2 md:-translate-x-1/2"
              />

              <ol className="space-y-8 md:space-y-6">
                {TIMELINE_EVENTS.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <li
                      key={item.year}
                      className="relative grid grid-cols-1 md:grid-cols-2 md:items-center"
                    >
                      {/* Center / left milestone node */}
                      <span
                        aria-hidden="true"
                        className="absolute top-6 left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-parchment md:top-1/2 md:left-1/2 md:-translate-y-1/2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>

                      {/* Horizontal connector arm on desktop */}
                      <span
                        aria-hidden="true"
                        className={`hidden md:block absolute top-1/2 h-px w-8 bg-border ${
                          isLeft ? "right-1/2 mr-2" : "left-1/2 ml-2"
                        }`}
                      />

                      <div
                        className={`pl-11 md:pl-0 ${
                          isLeft
                            ? "md:col-start-1 md:pr-12 md:text-right"
                            : "md:col-start-2 md:pl-12 md:text-left"
                        }`}
                      >
                        <article className="border border-border/80 bg-background/90 p-5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_10px_26px_rgba(0,0,0,0.1)] sm:p-6">
                          <h3 className="font-display text-[26px] font-semibold leading-none tabular-nums text-primary sm:text-[30px]">
                            {item.year}
                          </h3>
                          <p className="mt-3 text-[15px] leading-7 text-foreground/85">
                            {item.text}
                          </p>
                        </article>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>

          {/* Historical photo gallery matching GalleryPage style */}
          <section className="mx-auto max-w-[1160px] px-4 pb-16 lg:px-6">
            <div className="mb-7 flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                  Arhiiv
                </p>
                <h2 className="mt-1 font-display text-[28px] leading-snug text-accent md:text-[34px]">
                  Vaata ajaloolisi pilte
                </h2>
              </div>
              <p className="shrink-0 text-xs uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
                {historicalPhotos.length} fotot · Kliki pildil suuremaks vaateks
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {historicalPhotos.map((photo, idx) => (
                <figure key={photo.id} className="group flex flex-col">
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(photo)}
                    aria-label={
                      photo.caption
                        ? `Vaata ajaloolist fotot: ${photo.caption}`
                        : `Vaata ajaloolist fotot ${idx + 1}`
                    }
                    className="relative block aspect-[4/3] w-full overflow-hidden border border-border bg-cellar-deep p-1.5 text-left shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-shadow duration-200 hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="relative h-full w-full overflow-hidden bg-cellar">
                      <img
                        src={photo.src}
                        alt={
                          photo.caption || `Ajalooline foto ${idx + 1}`
                        }
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute right-2 bottom-2 flex h-8 w-8 items-center justify-center rounded-sm bg-cellar-deep/80 text-parchment opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                  {photo.caption && (
                    <figcaption className="mt-2 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
                      {photo.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>

          {/* Closing "Meeldis?" invitation band from live pyss.ee/ajalugu/ */}
          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto grid max-w-[1160px] gap-8 px-4 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-14 lg:px-6">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.25em] text-brass">
                  Meeldis?
                </p>
                <h2 className="mt-2 max-w-[680px] font-display text-[26px] leading-snug md:text-[34px]">
                  Tule kohapeale ja tunneta ajalugu oma silmaga
                </h2>
                <p className="mt-3 max-w-[640px] text-[15px] leading-7 text-parchment/85">
                  Kui ajalugu tundus huvitav, siis tee elamus veelgi huvitamaks
                  ja tule kohapeale. Kinnita keha ja tunneta ajalugu ning
                  võimast interjööri 10,2 m kõrguse laega õllerestoranis.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-none px-7 font-display text-[15px]"
                >
                  <Link to="/broneeri">
                    <Calendar aria-hidden="true" /> Broneeri laud
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-none border-brass/60 bg-transparent px-6 font-display text-brass hover:bg-brass hover:text-cellar-deep"
                >
                  <Link to="/galerii">
                    <Images aria-hidden="true" /> Kogu galerii
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <HistoryFooter />

      {/* Fullscreen Lightbox modal matching GalleryPage */}
      <AccessibleModal
        open={Boolean(selectedPhoto)}
        onClose={() => setSelectedPhoto(null)}
        ariaLabel="Suurendatud ajalooline foto"
        onPrev={historicalPhotos.length > 1 ? () => stepPhoto(-1) : undefined}
        onNext={historicalPhotos.length > 1 ? () => stepPhoto(1) : undefined}
      >
        {selectedPhoto && (
          <div
            className="relative flex max-h-[94vh] w-full max-w-[980px] flex-col overflow-hidden border border-brass/40 bg-cellar-deep text-parchment shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-brass/20 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-xs uppercase tracking-[0.2em] text-brass">
                  Ajalugu
                </span>
                <span className="text-xs text-parchment/80 tabular-nums">
                  {selectedIndex + 1} / {historicalPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {historicalPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => stepPhoto(-1)}
                      aria-label="Eelmine foto"
                      className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepPhoto(1)}
                      aria-label="Järgmine foto"
                      className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  data-modal-close
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Sulge galerii vaade"
                  className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative flex flex-1 items-center justify-center bg-black/50 p-3 sm:p-5">
              <img
                src={selectedPhoto.src}
                alt={
                  selectedPhoto.caption ||
                  `Ajalooline foto ${selectedIndex + 1}`
                }
                className="max-h-[74vh] w-auto max-w-full object-contain"
              />
            </div>

            {selectedPhoto.caption && (
              <div className="border-t border-brass/20 bg-cellar px-5 py-3.5">
                <p className="font-display text-[15px] leading-relaxed text-parchment/95">
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        )}
      </AccessibleModal>
    </div>
  );
}
