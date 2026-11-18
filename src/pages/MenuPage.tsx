import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Users,
  UtensilsCrossed,
  X,
  ZoomIn,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";
import {
  CATEGORY_LABELS,
  MENU_CATEGORIES,
  MENU_ITEMS,
  type MenuCategory,
  type MenuItem,
} from "../data/menuItems";

const GROUP_MENU_SUMMARY = [
  { number: "I", price: "32 €", desc: "Lõhe-kooresupp kuklis, sealihašnitsel, mustika-toorjuustukook" },
  { number: "II", price: "34 €", desc: "Seljanka kuklis, grillitud kanafilee, mustika-toorjuustukook" },
  { number: "III", price: "38 €", desc: "Läätse-tomatisupp kuklis, sägafilee, mustika-toorjuustukook" },
  { number: "IV", price: "32 €", desc: "Pikalt küpsetatud veiseliha veinikastmes, mustika-toorjuustukook" },
  { number: "V", price: "28 €", desc: "Sea kõhutükk „Burnt ends“, mustika-toorjuustukook" },
  { number: "VI · Vegan", price: "25 €", desc: "Läätse-tomatisupp kausis, köögivilja-kookosehautis, sidruni-kookosekook" },
];

type ModalMode = "detail" | "image";

export function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<"koik" | MenuCategory>("koik");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("detail");
  const [drinkPageIdx, setDrinkPageIdx] = useState(0);

  useEffect(() => {
    document.title = "Restorani menüü – Püssirohukelder";
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "koik") return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.categories.includes(activeCategory));
  }, [activeCategory]);

  const selectedIndex = useMemo(() => {
    if (!selectedItem) return -1;
    return filteredItems.findIndex((item) => item.id === selectedItem.id);
  }, [filteredItems, selectedItem]);

  useEffect(() => {
    if (!selectedItem) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      } else if (e.key === "ArrowRight" && filteredItems.length > 1) {
        const next = filteredItems[(selectedIndex + 1) % filteredItems.length];
        if (next) {
          setSelectedItem(next);
          setDrinkPageIdx(0);
        }
      } else if (e.key === "ArrowLeft" && filteredItems.length > 1) {
        const prev =
          filteredItems[
            (selectedIndex - 1 + filteredItems.length) % filteredItems.length
          ];
        if (prev) {
          setSelectedItem(prev);
          setDrinkPageIdx(0);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedItem, selectedIndex, filteredItems]);

  const openModal = (item: MenuItem, mode: ModalMode) => {
    setSelectedItem(item);
    setModalMode(mode);
    setDrinkPageIdx(0);
  };

  const stepItem = (direction: -1 | 1) => {
    if (!selectedItem || filteredItems.length <= 1) return;
    const nextIdx =
      (selectedIndex + direction + filteredItems.length) % filteredItems.length;
    const next = filteredItems[nextIdx];
    if (next) {
      setSelectedItem(next);
      setDrinkPageIdx(0);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Atmospheric dark cellar hero matching Gruppidele & Kannumeestele */}
        <section className="relative overflow-hidden bg-cellar-deep">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${A.heroBg})` }}
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
              <span aria-current="page" className="text-brass">Menüü</span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Köök ja vaadikraan
            </p>
            <h1 className="mt-2 max-w-[740px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Restorani menüü
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Patenteeritud kahurikuulisupid, krõbedad õllesnäkid, toekad pearoad
              ja magusad ampsud — kliki roal või fotol, et lähemalt tutvuda.
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
            {/* Category filter bar matching mockup layout + site styling */}
            <div className="flex flex-col gap-4 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
              <div
                className="flex flex-wrap items-center gap-1.5 sm:gap-2"
                role="group"
                aria-label="Isufilter"
              >
                {MENU_CATEGORIES.map((category) => {
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
                      {category.label}
                    </button>
                  );
                })}
              </div>

              <p className="text-[12px] tracking-[0.04em] text-muted-foreground tabular-nums">
                {filteredItems.length} valikut · (V) Vegan · (L) Laktoosivaba · (G) Gluteenivaba
              </p>
            </div>

            {/* 4-column editorial menu grid */}
            <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col border-b border-border/80 pb-5"
                >
                  {/* Image trigger: opens enlarged photo view */}
                  <button
                    type="button"
                    onClick={() => openModal(item, "image")}
                    aria-label={`Vaata suuremat pilti: ${item.name}`}
                    className="relative block aspect-[4/3] w-full overflow-hidden rounded-sm border border-border/70 bg-cellar-deep text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-sm bg-cellar-deep/80 text-parchment opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Title, description & price trigger: opens full dish detail popup */}
                  <button
                    type="button"
                    onClick={() => openModal(item, "detail")}
                    className="mt-3.5 flex flex-1 flex-col text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h2 className="font-display text-[19px] font-semibold leading-snug text-accent transition-colors group-hover:text-primary">
                        {item.name}
                      </h2>
                    </div>

                    {(item.dietary?.length || item.note) && (
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-primary">
                        {[
                          item.note,
                          item.dietary?.length ? `(${item.dietary.join(", ")})` : null,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    )}

                    <p className="mt-2 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">
                      {item.shortDescription}
                    </p>

                    <p className="mt-3 font-display text-[19px] font-semibold tabular-nums text-cellar-deep">
                      {item.price}
                    </p>
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* Bottom cellar invitation band matching subpages */}
          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto grid max-w-[1160px] gap-8 px-4 py-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-14 lg:px-6">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.25em] text-brass">
                  Laua broneerimine ja seltskonnad
                </p>
                <h2 className="mt-3 max-w-[680px] font-display text-[26px] leading-snug md:text-[34px]">
                  Planeerid õhtusööki või pidu suurema seltskonnaga?
                </h2>
                <p className="mt-3 max-w-[640px] text-[15px] leading-6 text-parchment/85">
                  Helista laua broneerimiseks numbril{" "}
                  <a
                    href="tel:+3727303555"
                    className="text-brass underline decoration-brass/40 underline-offset-4 hover:text-parchment"
                  >
                    +372 7 303 555
                  </a>{" "}
                  või tutvu meie 2026. aasta grupimenüüde ja peoruumidega.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-none px-7 font-display text-[15px]"
                >
                  <Link to="/gruppidele">
                    Vaata grupimenüüd <Users aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-none border-brass/60 bg-transparent px-6 font-display text-brass hover:bg-brass hover:text-cellar-deep"
                >
                  <a href="tel:+3727303555">
                    <Phone aria-hidden="true" /> Helista
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <HistoryFooter />

      {/* Popup modal: enlarged photo view or full dish detail popup */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-cellar-deep/85 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-modal-title"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-[820px] overflow-y-auto border border-brass/40 bg-parchment text-foreground shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
            style={{
              backgroundImage: `url(${A.paper})`,
              backgroundRepeat: "repeat",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar controls */}
            <div className="flex items-center justify-between border-b border-border bg-cellar-deep px-5 py-3 text-parchment">
              <p className="font-display text-[12px] uppercase tracking-[0.2em] text-brass">
                {selectedItem.categories.map((c) => CATEGORY_LABELS[c]).join(" · ")}
                {selectedItem.dietary?.length
                  ? ` · (${selectedItem.dietary.join(", ")})`
                  : ""}
              </p>
              <div className="flex items-center gap-2">
                {filteredItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => stepItem(-1)}
                      aria-label="Eelmine roog"
                      className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepItem(1)}
                      aria-label="Järgmine roog"
                      className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Sulge aken"
                  className="flex h-10 w-10 items-center justify-center border border-brass/40 text-parchment/90 transition-colors hover:border-brass hover:text-brass cursor-pointer"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {modalMode === "image" ? (
              <div className="p-4 sm:p-6">
                <div className="overflow-hidden border border-border bg-cellar-deep">
                  <img
                    src={
                      selectedItem.drinkMenuPages
                        ? selectedItem.drinkMenuPages[drinkPageIdx]?.image ??
                          selectedItem.image
                        : selectedItem.image
                    }
                    alt={selectedItem.name}
                    className="max-h-[62vh] w-full object-contain"
                  />
                </div>
                {selectedItem.drinkMenuPages && (
                  <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Joogimenüü leheküljed">
                    {selectedItem.drinkMenuPages.map((pg, idx) => (
                      <button
                        key={pg.title}
                        type="button"
                        aria-pressed={drinkPageIdx === idx}
                        onClick={() => setDrinkPageIdx(idx)}
                        className={`min-h-[36px] border px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                          drinkPageIdx === idx
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background/80 text-foreground/85 hover:border-accent"
                        }`}
                      >
                        Lk {idx + 1}: {pg.title}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2
                      id="menu-modal-title"
                      className="font-display text-[24px] text-accent"
                    >
                      {selectedItem.name}
                    </h2>
                    <p className="mt-1 font-display text-[22px] font-semibold tabular-nums text-primary">
                      {selectedItem.price}
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={() => setModalMode("detail")}
                    className="rounded-none font-display"
                  >
                    <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
                    Vaata roa kirjeldust
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-5 sm:p-7">
                <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
                  <div>
                    <button
                      type="button"
                      onClick={() => setModalMode("image")}
                      aria-label={`Suurenda pilti: ${selectedItem.name}`}
                      className="group relative block w-full overflow-hidden border border-border bg-cellar-deep cursor-pointer"
                    >
                      <img
                        src={
                          selectedItem.drinkMenuPages
                            ? selectedItem.drinkMenuPages[drinkPageIdx]?.image ??
                              selectedItem.image
                            : selectedItem.image
                        }
                        alt={selectedItem.name}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 bg-cellar-deep/85 px-2.5 py-1 text-[12px] text-parchment">
                        <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                        Suuremalt
                      </span>
                    </button>

                    {selectedItem.drinkMenuPages && (
                      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Joogimenüü leheküljed">
                        {selectedItem.drinkMenuPages.map((pg, idx) => (
                          <button
                            key={pg.title}
                            type="button"
                            aria-pressed={drinkPageIdx === idx}
                            onClick={() => setDrinkPageIdx(idx)}
                            className={`min-h-[36px] border px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                              drinkPageIdx === idx
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background/80 text-foreground/85 hover:border-accent"
                            }`}
                          >
                            Lk {idx + 1}: {pg.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {selectedItem.note && (
                      <p className="font-display text-[12px] uppercase tracking-[0.22em] text-primary">
                        {selectedItem.note}
                      </p>
                    )}
                    <h2
                      id="menu-modal-title"
                      className="mt-1 font-display text-[26px] leading-snug text-accent sm:text-[30px]"
                    >
                      {selectedItem.name}
                    </h2>

                    <p className="mt-3 font-display text-[26px] font-semibold tabular-nums text-primary">
                      {selectedItem.price}
                    </p>

                    <span className="my-4 block h-px w-16 bg-border" />

                    <p className="text-[15px] leading-7 text-foreground/85">
                      {selectedItem.fullDescription}
                    </p>

                    {selectedItem.dietary && selectedItem.dietary.length > 0 && (
                      <p className="mt-4 text-[13px] text-muted-foreground">
                        Märgistus:{" "}
                        <span className="font-semibold text-foreground">
                          {selectedItem.dietary
                            .map((d) =>
                              d === "V"
                                ? "V – Vegan / taimne"
                                : d === "L"
                                  ? "L – Laktoosivaba"
                                  : "G – Gluteenivaba",
                            )
                            .join(" · ")}
                        </span>
                      </p>
                    )}

                    {selectedItem.isGroupMenuOverview && (
                      <div className="mt-5 space-y-2 border-t border-border pt-4">
                        {GROUP_MENU_SUMMARY.map((gm) => (
                          <div
                            key={gm.number}
                            className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-2 text-[13px]"
                          >
                            <div>
                              <span className="font-semibold text-accent">
                                Menüü {gm.number}:
                              </span>{" "}
                              <span className="text-foreground/80">{gm.desc}</span>
                            </div>
                            <span className="shrink-0 font-display font-semibold tabular-nums text-primary">
                              {gm.price}
                            </span>
                          </div>
                        ))}
                        <div className="pt-2">
                          <Button
                            asChild
                            className="rounded-none font-display text-[14px]"
                          >
                            <Link
                              to="/gruppidele"
                              onClick={() => setSelectedItem(null)}
                            >
                              Ava täispikk Gruppidele leht{" "}
                              <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
