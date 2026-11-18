import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Phone,
  UtensilsCrossed,
  X,
  ZoomIn,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";
import {
  GALLERY_CATEGORIES,
  GALLERY_CATEGORY_LABELS,
  GALLERY_PHOTOS,
  type GalleryCategory,
  type GalleryPhoto,
} from "../data/galleryItems";

const HERO_IMAGE = "/images/gallery/yldine/04-jphion_pyss_1_sisevaade.jpg";
const MATTERPORT_TOUR_URL = "https://my.matterport.com/show/?m=f5e53ekd4DF";

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("yldine");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    document.title = "Galerii – Püssirohukelder";
  }, []);

  const visiblePhotos = useMemo(() => {
    return GALLERY_PHOTOS.filter((photo) => photo.category === activeCategory);
  }, [activeCategory]);

  const selectedIndex = useMemo(() => {
    if (!selectedPhoto) return -1;
    return visiblePhotos.findIndex((p) => p.id === selectedPhoto.id);
  }, [visiblePhotos, selectedPhoto]);

  useEffect(() => {
    if (!selectedPhoto) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedPhoto(null);
      } else if (e.key === "ArrowRight" && visiblePhotos.length > 1) {
        const next = visiblePhotos[(selectedIndex + 1) % visiblePhotos.length];
        if (next) setSelectedPhoto(next);
      } else if (e.key === "ArrowLeft" && visiblePhotos.length > 1) {
        const prev =
          visiblePhotos[
            (selectedIndex - 1 + visiblePhotos.length) % visiblePhotos.length
          ];
        if (prev) setSelectedPhoto(prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedPhoto, selectedIndex, visiblePhotos]);

  const stepPhoto = (direction: -1 | 1) => {
    if (!selectedPhoto || visiblePhotos.length <= 1) return;
    const nextIdx =
      (selectedIndex + direction + visiblePhotos.length) % visiblePhotos.length;
    const next = visiblePhotos[nextIdx];
    if (next) setSelectedPhoto(next);
  };

  const sectionsToRender = useMemo(() => {
    const chosen = GALLERY_CATEGORIES.find((c) => c.id === activeCategory);
    if (!chosen) return [];
    return [
      {
        ...chosen,
        photos: GALLERY_PHOTOS.filter((p) => p.category === chosen.id),
      },
    ];
  }, [activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<GalleryCategory, number> = {
      yldine: 0,
      ajalugu: 0,
      pidu: 0,
    };
    for (const photo of GALLERY_PHOTOS) {
      counts[photo.category] += 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Atmospheric dark cellar hero matching Menüü, Gruppidele & Kannumeestele */}
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
              <span aria-current="page" className="text-brass">Galerii</span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Hetked keldrivõlvide all
            </p>
            <h1 className="mt-2 max-w-[740px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Galerii
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Piilu Püssirohukeldri 300-aastastesse kivivõlvidesse, sirvi
              ajaloolisi arhiivifotosid ning meenuta meeleolukaid peoõhtuid.
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
          <section className="mx-auto max-w-[1160px] px-4 py-12 md:py-16 lg:px-6">
            {/* Album filter bar */}
            <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
              <div
                className="flex flex-wrap items-center gap-1.5 sm:gap-2"
                role="group"
                aria-label="Galeriide filter"
              >
                {GALLERY_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveCategory(category.id)}
                      className={`min-h-[40px] whitespace-nowrap shrink-0 rounded-full px-4 py-2 font-display text-[15px] transition-colors cursor-pointer ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground/85 hover:bg-secondary/70 hover:text-accent"
                      }`}
                    >
                      {category.label}{" "}
                      <span
                        className={`ml-1 text-xs tabular-nums ${
                          isActive ? "text-primary-foreground/90" : "text-muted-foreground"
                        }`}
                      >
                        ({categoryCounts[category.id]})
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[12px] tracking-[0.04em] text-muted-foreground tabular-nums">
                {visiblePhotos.length} fotot · Kliki pildil suuremaks vaateks
              </p>
            </div>

            {/* Album sections */}
            <div className="mt-10 space-y-16">
              {sectionsToRender.map((section) => (
                <div key={section.id}>
                  <div className="mb-6 flex flex-col gap-2 border-b border-border/80 pb-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="font-display text-[12px] uppercase tracking-[0.24em] text-primary">
                        {GALLERY_CATEGORY_LABELS[section.id]}
                      </p>
                      <h2 className="mt-1 font-display text-[26px] leading-snug text-accent md:text-[32px]">
                        {section.label}
                      </h2>
                      <p className="mt-1.5 max-w-[680px] text-[14px] leading-relaxed text-muted-foreground">
                        {section.subtitle}
                      </p>
                    </div>
                    <p className="shrink-0 text-[12px] uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
                      {section.photos.length} fotot
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {section.photos.map((photo, idx) => (
                      <figure key={photo.id} className="group flex flex-col">
                        <button
                          type="button"
                          onClick={() => setSelectedPhoto(photo)}
                          aria-label={
                            photo.caption
                              ? `Vaata fotot: ${photo.caption}`
                              : `Vaata fotot ${idx + 1} albumist ${section.label}`
                          }
                          className="relative block aspect-[4/3] w-full overflow-hidden border border-border bg-cellar-deep p-1.5 text-left shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-shadow duration-200 hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <div className="relative h-full w-full overflow-hidden bg-cellar">
                            <img
                              src={photo.src}
                              alt={
                                photo.caption ||
                                `${section.label} – foto ${idx + 1}`
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
                </div>
              ))}
            </div>
          </section>

          {/* 3D Virtual tour callout band from live gallery page */}
          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto grid max-w-[1160px] gap-8 px-4 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-16 lg:px-6">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.25em] text-brass">
                  Püssirohukelder 3D
                </p>
                <h2 className="mt-3 max-w-[680px] font-display text-[28px] leading-snug md:text-[36px]">
                  Külasta ka Püssirohukeldrit virtuaalse tuuriga
                </h2>
                <p className="mt-3 max-w-[640px] text-[15px] leading-7 text-parchment/85">
                  Jaluta läbi 10,2 meetri kõrguste kivivõlvide, vaata saali
                  paigutust ning piilu sisse meie ajaloolistesse kambritesse juba
                  enne külastust.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-none border-brass/60 bg-transparent px-7 font-display text-[15px] text-brass hover:bg-brass hover:text-cellar-deep"
              >
                <a
                  href={MATTERPORT_TOUR_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ava 3D virtuaaltuur <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            </div>
          </section>

          {/* "Meeldis?" closing invitation section matching live pyss.ee/galerii/ */}
          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="grid gap-8 border-y border-border py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                  Meeldis?
                </p>
                <h2 className="mt-2 font-display text-[28px] leading-snug text-accent md:text-[34px]">
                  Tule kohapeale ja tunneta ajalugu oma silmaga
                </h2>
                <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-foreground/80">
                  Kui pildid meeldisid, siis tee elamus veelgi huvitamaks ja tule
                  kohapeale. Kinnita keha ja tunneta ajalugu ning võimast
                  interjööri maailma kõige kõrgeima laega õllerestoranis.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-none px-7 font-display text-[15px]"
                >
                  <Link to="/menuu">
                    <UtensilsCrossed aria-hidden="true" /> Tutvu menüüga
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-none border-accent/50 bg-transparent px-6 font-display text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <a href="tel:+3727303555">
                    <Phone aria-hidden="true" /> +372 7 303 555
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <HistoryFooter />

      {/* Fullscreen Lightbox modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cellar-deep/90 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Suurendatud galeriifoto"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative flex max-h-[94vh] w-full max-w-[980px] flex-col overflow-hidden border border-brass/40 bg-cellar-deep text-parchment shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox top bar */}
            <div className="flex items-center justify-between border-b border-brass/20 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-[12px] uppercase tracking-[0.2em] text-brass">
                  {GALLERY_CATEGORY_LABELS[selectedPhoto.category]}
                </span>
                <span className="text-xs text-parchment/80 tabular-nums">
                  {selectedIndex + 1} / {visiblePhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {visiblePhotos.length > 1 && (
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
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Sulge galerii vaade"
                  className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Image viewport */}
            <div className="relative flex flex-1 items-center justify-center bg-black/50 p-3 sm:p-5">
              <img
                src={selectedPhoto.src}
                alt={
                  selectedPhoto.caption ||
                  `${GALLERY_CATEGORY_LABELS[selectedPhoto.category]} – foto ${selectedIndex + 1}`
                }
                className="max-h-[74vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Caption bar if present */}
            {selectedPhoto.caption && (
              <div className="border-t border-brass/20 bg-cellar px-5 py-3.5">
                <p className="font-display text-[15px] leading-relaxed text-parchment/95">
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
