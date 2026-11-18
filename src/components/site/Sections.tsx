import { Link } from "react-router-dom";

const ITEMS = [
  {
    title: "Ainulaadne interjöör",
    text: "Püssirohukeldril on 300 aastat ajalugu. Kohapeal saad maitsta patenteeritud õlut ja suppe, mida kuskil mujal maitsta ei saa.",
  },
  {
    title: "Maitsvad road",
    text: "Püssirohukeldri menüü on sama ainulaadne nagu koht ise. Roogade taga peitub pikk ajalugu ja mahe elamus.",
  },
  {
    title: "Põnev programm",
    text: "Püssirohukeldris ei hakka kunagi igav, meie tihe ja meeleolukas programm koos elava muusikaga toimub mitmel päeval nädalas.",
  },
];

export function Highlights() {
  return (
    <section className="mx-auto max-w-[1160px] px-4 pt-16 pb-4 md:pt-20 lg:px-6">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8">
        {ITEMS.map((it) => (
          <article key={it.title} className="max-w-[420px]">
            <h2 className="font-display text-[22px] text-accent">{it.title}</h2>
            <span className="mt-3 block h-px w-14 bg-border" />
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {it.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function News() {
  const news = [
    {
      date: "Nädala pakkumine",
      title: "Kannumeeste õhtu",
      text: "Igal reedel elav muusika ning kannumeeste eriprogramm keldrivõlvide all.",
    },
    {
      date: "Uudis",
      title: "Uus hooajamenüü",
      text: "Sügishooaja road on menüüs — ahjupraad, hapukapsasupp ja majaõlu.",
    },
  ];

  return (
    <section className="mx-auto max-w-[1160px] px-4 py-14 lg:px-6">
      <h2 className="font-display text-[24px] text-accent">
        Uudised / pakkumised:
      </h2>
      <span className="mt-3 block h-px w-full bg-border" />
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {news.map((n) => (
          <article key={n.title} className="border-l-2 border-primary/60 pl-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {n.date}
            </p>
            <h3 className="mt-1 font-display text-[19px] text-foreground">
              {n.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              {n.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProgramBand() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.22 0.03 45) 0%, oklch(0.15 0.02 45) 100%)",
      }}
    >
      <div className="mx-auto max-w-[1160px] px-4 py-14 text-center md:py-16 lg:px-6">
        <p className="font-display text-[13px] uppercase tracking-[0.3em] text-brass">
          Tutvu programmiga
        </p>
        <h2 className="mx-auto mt-4 max-w-[720px] font-display text-[26px] leading-snug text-parchment md:text-[32px]">
          Lisaks maitseelamustele pakume ka meelelahutust
        </h2>
        <p className="mx-auto mt-4 max-w-[620px] text-[15px] leading-relaxed text-parchment/85">
          Lausa mitmel päeval nädalas. Elav muusika, hea seltskond ja maitsvad
          road on siinkohal võtmesõnad.
        </p>
        <Link
          to="/programm"
          className="mt-7 inline-flex min-h-[44px] items-center bg-primary px-6 py-3 font-display text-[15px] text-primary-foreground transition-colors hover:bg-primary/85"
        >
          Tutvu programmiga
        </Link>
      </div>
    </section>
  );
}

export function VirtualTour() {
  return (
    <section className="mx-auto max-w-[1160px] px-4 py-16 lg:px-6">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="font-display text-[13px] uppercase tracking-[0.25em] text-primary">
            Püssirohukelder 3D
          </p>
          <h2 className="mt-3 font-display text-[26px] leading-snug text-accent md:text-[30px]">
            Tutvu Püssirohukeldri virtuaaltuuriga
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Astu sisse meie virtuaalsesse õllerestorani!
          </p>
          <a
            href="https://my.matterport.com/show/?m=f5e53ekd4DF"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[44px] items-center border border-accent/60 px-6 py-3 font-display text-[15px] text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Püssirohukelder 3D
            <span className="sr-only"> (avaneb uues aknas)</span>
          </a>
        </div>
        <a
          href="https://my.matterport.com/show/?m=f5e53ekd4DF"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="group relative block border border-border/70 bg-cellar-deep/90 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-cellar">
            <img
              src="/assets/aistudio/pilt_3d9e12c8.png"
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
