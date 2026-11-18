import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info,
  Phone,
  Ticket,
  X,
  ZoomIn,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";
import {
  PROGRAM_EVENTS,
  PROGRAM_HEADING,
  type ProgramEvent,
} from "../data/programEvents";

const HERO_IMAGE = "/images/gallery/pidu/45-img_2698.jpg";

type ModalMode = "poster" | "info";

export function ProgramPage() {
  const [selectedEvent, setSelectedEvent] = useState<ProgramEvent | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("info");

  useEffect(() => {
    document.title = "Püssirohukeldri programm – Püssirohukelder";
  }, []);

  const selectedIndex = useMemo(() => {
    if (!selectedEvent) return -1;
    return PROGRAM_EVENTS.findIndex((ev) => ev.id === selectedEvent.id);
  }, [selectedEvent]);

  useEffect(() => {
    if (!selectedEvent) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedEvent(null);
      } else if (e.key === "ArrowRight" && PROGRAM_EVENTS.length > 1) {
        const next = PROGRAM_EVENTS[(selectedIndex + 1) % PROGRAM_EVENTS.length];
        if (next) setSelectedEvent(next);
      } else if (e.key === "ArrowLeft" && PROGRAM_EVENTS.length > 1) {
        const prev =
          PROGRAM_EVENTS[
            (selectedIndex - 1 + PROGRAM_EVENTS.length) % PROGRAM_EVENTS.length
          ];
        if (prev) setSelectedEvent(prev);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedEvent, selectedIndex]);

  const openModal = (event: ProgramEvent, mode: ModalMode) => {
    setSelectedEvent(event);
    setModalMode(mode);
  };

  const stepEvent = (direction: -1 | 1) => {
    if (!selectedEvent || PROGRAM_EVENTS.length <= 1) return;
    const nextIdx =
      (selectedIndex + direction + PROGRAM_EVENTS.length) % PROGRAM_EVENTS.length;
    const next = PROGRAM_EVENTS[nextIdx];
    if (next) setSelectedEvent(next);
  };

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
              <span aria-current="page" className="text-brass">
                Programm
              </span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Elav muusika ja sündmused
            </p>
            <h1 className="mt-2 max-w-[760px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Püssirohukeldri programm
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Neljapäevast laupäevani kõlab keldrivõlvide all elav muusika,
              lisaks toimuvad maleturniir, mälumäng ja Beerpong.
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
          {/* Plugin-faithful program grid: heading + 4-column cards on wide screens */}
          <section className="mx-auto max-w-[1200px] px-4 py-14 md:py-20 lg:px-6">
            <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-[28px] leading-snug text-accent md:text-[36px]">
                {PROGRAM_HEADING}
              </h2>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground tabular-nums">
                {PROGRAM_EVENTS.length} sündmust
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {PROGRAM_EVENTS.map((ev) => (
                <article
                  key={ev.id}
                  className="group flex flex-col border border-border/80 bg-background/95 shadow-[0_10px_26px_rgba(0,0,0,0.08)]"
                >
                  {/* Poster trigger: opens enlarged poster lightbox just like live plugin */}
                  <button
                    type="button"
                    onClick={() => openModal(ev, "poster")}
                    aria-label={`Vaata suuremat plakatit: ${ev.title}`}
                    className="relative block aspect-[3/4] w-full overflow-hidden bg-cellar-deep text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={ev.image}
                      alt={ev.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    {/* Date badge matching live plugin .pyss-date-badge */}
                    <span className="absolute top-3 left-3 flex min-w-[54px] flex-col items-center border border-brass/50 bg-cellar-deep/95 px-2.5 py-1.5 text-center shadow-md">
                      <span className="font-display text-[22px] font-bold leading-none tabular-nums text-parchment">
                        {ev.day}
                      </span>
                      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
                        {ev.month}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute right-2.5 bottom-2.5 flex h-9 w-9 items-center justify-center bg-cellar-deep/85 text-parchment opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Title + VAATA LÄHEMALT button matching live plugin */}
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <h3 className="font-display text-[19px] font-semibold leading-snug text-accent">
                      {ev.title}
                    </h3>

                    <button
                      type="button"
                      onClick={() => openModal(ev, "info")}
                      className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center bg-primary px-4 py-2.5 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
                    >
                      VAATA LÄHEMALT
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Bottom reservation reminder band */}
          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto grid max-w-[1160px] gap-8 px-4 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-14 lg:px-6">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.25em] text-brass">
                  Kindlusta parim laud
                </p>
                <h2 className="mt-3 max-w-[680px] font-display text-[26px] leading-snug md:text-[34px]">
                  Broneeri laud elava muusika õhtuks ette
                </h2>
                <p className="mt-3 max-w-[640px] text-[15px] leading-6 text-parchment/85">
                  Kannumeeste Seltsi liikmetele on sissepääs enamikele
                  kontsertidele tasuta. Piletiga üritustel ei vabasta
                  lauabroneering pileti ostmisest.
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

      {/* Live-plugin style modal: Poster Lightbox OR Event Info Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cellar-deep/88 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="program-modal-title"
          onClick={() => setSelectedEvent(null)}
        >
          {modalMode === "poster" ? (
            <div
              className="relative flex max-h-[94vh] w-full max-w-[820px] flex-col overflow-hidden border border-brass/40 bg-cellar-deep text-parchment shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox top bar */}
              <div className="flex items-center justify-between gap-3 border-b border-brass/25 px-5 py-3">
                <p
                  id="program-modal-title"
                  className="truncate font-display text-[15px] text-parchment"
                >
                  {selectedEvent.day}. {selectedEvent.month} · {selectedEvent.title}
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => stepEvent(-1)}
                    aria-label="Eelmine sündmus"
                    className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepEvent(1)}
                    aria-label="Järgmine sündmus"
                    className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    aria-label="Sulge plakat"
                    className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center bg-black/50 p-3 sm:p-5">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brass/25 bg-cellar px-5 py-3.5">
                <p className="text-[14px] text-parchment/85">
                  {selectedEvent.datetime}
                </p>
                <Button
                  type="button"
                  onClick={() => setModalMode("info")}
                  className="min-h-[40px] rounded-none font-display text-[14px]"
                >
                  <Info className="h-4 w-4" aria-hidden="true" />
                  Vaata lähemalt
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="relative max-h-[92vh] w-full max-w-[600px] overflow-y-auto border border-brass/40 bg-parchment text-foreground shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
              style={{
                backgroundImage: `url(${A.paper})`,
                backgroundRepeat: "repeat",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Info modal header */}
              <div className="flex items-center justify-between gap-3 border-b border-border bg-cellar-deep px-5 py-3 text-parchment">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-brass">
                  {selectedEvent.day}. {selectedEvent.month} 2026
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => stepEvent(-1)}
                    aria-label="Eelmine sündmus"
                    className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepEvent(1)}
                    aria-label="Järgmine sündmus"
                    className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedEvent(null)}
                    aria-label="Sulge sündmuse info"
                    className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Event info body matching live .pyss-info-data */}
              <div className="p-6 sm:p-8">
                <h2
                  id="program-modal-title"
                  className="font-display text-[26px] leading-snug text-accent sm:text-[32px]"
                >
                  {selectedEvent.title}
                </h2>

                <div className="mt-5 space-y-3 border-y border-border py-4">
                  <p className="flex items-start gap-2.5 text-[16px] font-medium text-foreground">
                    <Calendar
                      className="mt-1 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span>{selectedEvent.datetime}</span>
                  </p>
                  {selectedEvent.price && (
                    <p className="flex items-start gap-2.5 font-display text-[18px] font-semibold text-primary">
                      <Ticket
                        className="mt-1 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{selectedEvent.price}</span>
                    </p>
                  )}
                </div>

                {selectedEvent.extra && (
                  <p className="mt-5 text-[15px] leading-7 text-foreground/85">
                    {selectedEvent.extra}
                  </p>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-none px-6 font-display text-[15px]"
                  >
                    <Link
                      to="/broneeri"
                      onClick={() => setSelectedEvent(null)}
                    >
                      Broneeri laud
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setModalMode("poster")}
                    className="h-11 rounded-none border-accent/50 bg-transparent px-5 font-display text-[15px] text-accent hover:bg-accent hover:text-accent-foreground"
                  >
                    <ZoomIn className="h-4 w-4" aria-hidden="true" />
                    Vaata plakatit
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
