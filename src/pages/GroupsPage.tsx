import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Check,
  ChevronRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Music2,
  Phone,
  ShieldCheck,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";

const FEATURES = [
  {
    icon: Building2,
    title: "Omapärane arhitektuur",
    text: "Vaieldamatult omapäraseima ja põnevaima arhitektuuriga peoruumid Tartus.",
  },
  {
    icon: Clock3,
    title: "Ligi 300 aastat ajalugu",
    text: "Kõrged kivivõlvid ja rustikaalne sisearhitektuur viivad külalised justkui teise maailma.",
  },
  {
    icon: ShieldCheck,
    title: "Privaatsus",
    text: "Schrammi kambris saad pidada koosviibimisi oma seltskonnaga privaatselt.",
  },
  {
    icon: UtensilsCrossed,
    title: "Ainulaadne maitseelamus",
    text: "Proovi patenteeritud Püssirohu Punast õlut ja meie kuulsaid suppe kahurikuulis.",
  },
  {
    icon: Music2,
    title: "Meelelahutus",
    text: "Neljapäevast laupäevani kõlab elav muusika, lisaks toimuvad maleturniir ja BeerPong.",
  },
];

const MENUS = [
  {
    number: "I",
    price: "32 €",
    dishes: [
      "Lõhe-kooresupp kuklis",
      "Sealihašnitsel",
      "Mustika-toorjuustukook",
      "Vesi ning kohv või tee",
    ],
  },
  {
    number: "II",
    price: "34 €",
    dishes: [
      "Seljanka kuklis",
      "Grillitud kanafilee",
      "Mustika-toorjuustukook",
      "Vesi ning kohv või tee",
    ],
  },
  {
    number: "III",
    price: "38 €",
    dishes: [
      "Läätse-tomatisupp kuklis",
      "Sägafilee",
      "Mustika-toorjuustukook",
      "Vesi ning kohv või tee",
    ],
  },
  {
    number: "IV",
    price: "32 €",
    dishes: [
      "Pikalt küpsetatud veiseliha veinikastmes",
      "Mustika-toorjuustukook",
      "Vesi ning kohv või tee",
    ],
  },
  {
    number: "V",
    price: "28 €",
    dishes: [
      "Sea kõhutükk „Burnt ends“",
      "Mustika-toorjuustukook",
      "Vesi ning kohv või tee",
    ],
  },
  {
    number: "VI",
    price: "25 €",
    label: "Vegan",
    dishes: [
      "Läätse-tomatisupp kausis",
      "Köögivilja-kookosehautis",
      "Sidruni-kookosekook",
      "Vesi ning kohv või tee",
    ],
  },
];

export function GroupsPage() {
  useEffect(() => {
    document.title = "Peoruumid gruppidele Tartus – Püssirohukelder";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <section className="relative overflow-hidden bg-cellar-deep">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{ backgroundImage: `url(${A.groupHero})` }}
          />
          <div className="absolute inset-0 bg-cellar-deep/70" />
          <div className="relative mx-auto max-w-[1160px] px-4 pt-8 pb-10 md:pt-9 md:pb-12 lg:px-6">
            <nav
              className="flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-parchment/80"
              aria-label="Asukoht lehel"
            >
              <Link to="/" className="transition-colors hover:text-brass">
                Avaleht
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span aria-current="page" className="text-brass">Gruppidele</span>
            </nav>
            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Peoruumid Tartu südames
            </p>
            <h1 className="mt-2 max-w-[790px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Otsid kohta, kus sõprade või kolleegidega aega veeta?
            </h1>
            <p className="mt-3 max-w-[680px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Püssirohukeldri peoruumid mahutavad kokku kuni 300 külalist — ruumi,
              sööki ja jooki jätkub kindlalt.
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
          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_360px] md:items-center">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                  Pidulik või asjalik kohtumine
                </p>
                <h2 className="mt-3 max-w-[680px] font-display text-[28px] leading-snug text-accent md:text-[36px]">
                  Soovid privaatsust? Meil on sinu seltskonnale ruumi
                </h2>
                <p className="mt-5 max-w-[700px] text-[16px] leading-7 text-foreground/80">
                  Sinu südamerahuks võime öelda, et Püssirohukeldris on piisavalt
                  ruumi ning joogi- ja söögipoolist jätkub enam kui kindlalt.
                  Korralda meie juures sünnipäev, jõulupidu või äriüritus.
                </p>
                <div className="mt-7 divide-y divide-border/80 border-y border-border">
                  <div className="flex items-center gap-4 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="font-display text-[19px] leading-7 text-accent">
                      Ruumide rent on tasuta, kui otsustad enda keha
                      Püssirohukeldris kosutada.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 py-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                      <Users className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="font-display text-[19px] leading-7 text-accent">
                      Schrammi kamber mahutab kuni 30 inimest.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-border bg-cellar-deep p-2 shadow-[0_16px_32px_rgba(0,0,0,0.22)]">
                <img
                  src={A.groupHero}
                  alt="Püssirohukeldri ajalooline peoruum"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </section>

          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto max-w-[1160px] px-4 py-14 md:py-18 lg:px-6">
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-end">
                <div>
                  <p className="font-display text-[13px] uppercase tracking-[0.25em] text-brass">
                    Privaatne ruum kuni 30 inimesele
                  </p>
                  <h2 className="mt-3 font-display text-[30px] md:text-[40px]">
                    Schrammi kamber
                  </h2>
                  <p className="mt-4 max-w-[720px] text-[15px] leading-7 text-parchment/85">
                    Schrammi kambris on pikk laud, mille taga saad seltskonnaga
                    mõnusalt aega veeta. Kamber sobib ideaalselt kõikvõimalike
                    tähtsündmuste pidamiseks — olgu selleks sünnipäev, jõulupidu või
                    hoopis äriüritus.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-none border-brass/60 bg-transparent font-display text-brass hover:bg-brass hover:text-cellar-deep"
                >
                  <a
                    href="https://my.matterport.com/show/?m=XdmPjt6oVTT"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vaata virtuaaltuuri <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {A.groupRooms.map((image, index) => (
                  <figure
                    key={image}
                    className="overflow-hidden border border-brass/25 bg-cellar p-1.5"
                  >
                    <img
                      src={image}
                      alt={`Schrammi kambri sisevaade ${index + 1}`}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="mb-9 border-b border-border pb-5">
              <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                Miks Püssirohukelder?
              </p>
              <h2 className="mt-2 font-display text-[28px] text-accent md:text-[34px]">
                Kohtumine, mida jäädakse mäletama
              </h2>
            </div>
            <div className="grid gap-x-9 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon
                    className="h-7 w-7 text-primary"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-[19px] leading-snug text-accent">
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-muted-foreground">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-y border-border bg-secondary/45">
            <div className="mx-auto grid max-w-[1160px] gap-10 px-4 py-14 md:grid-cols-[320px_minmax(0,1fr)] md:py-20 lg:px-6">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.24em] text-primary">
                  Grupimenüü 2026
                </p>
                <h2 className="mt-3 font-display text-[30px] leading-snug text-accent md:text-[38px]">
                  Kuus valikut igale seltskonnale
                </h2>
                <p className="mt-4 text-[15px] leading-6 text-muted-foreground">
                  Vali oma seltskonnale sobiv terviklik menüü. Kõik hinnad on
                  inimese kohta.
                </p>
                <img
                  src={A.groupMenu}
                  alt="Püssirohukeldri grupimenüü roog"
                  className="mt-7 aspect-[4/3] w-full border border-border object-cover shadow-[0_12px_26px_rgba(0,0,0,0.2)]"
                />
              </div>
              <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
                {MENUS.map((menu) => (
                  <article key={menu.number} className="bg-background/95 p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          Menüü {menu.number}
                        </p>
                        {menu.label && (
                          <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-primary">
                            {menu.label}
                          </p>
                        )}
                      </div>
                      <p className="font-display text-[25px] text-primary">
                        {menu.price}
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {menu.dishes.map((dish) => (
                        <li
                          key={dish}
                          className="flex gap-2 text-[14px] leading-5 text-foreground/75"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 bg-primary"
                            aria-hidden="true"
                          />
                          {dish}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-cellar-deep text-parchment">
            <div className="mx-auto grid max-w-[1160px] gap-9 px-4 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:py-16 lg:px-6">
              <div>
                <p className="font-display text-[13px] uppercase tracking-[0.25em] text-brass">
                  Paneme peo paika
                </p>
                <h2 className="mt-3 max-w-[680px] font-display text-[29px] leading-snug md:text-[38px]">
                  Küsi oma seltskonnale pakkumist
                </h2>
                <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-[15px] text-parchment/85">
                  <a
                    href="mailto:pyss@pyss.ee"
                    className="inline-flex min-h-[40px] items-center gap-2 transition-colors hover:text-brass"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    pyss@pyss.ee
                  </a>
                  <a
                    href="tel:+3727303555"
                    className="inline-flex min-h-[40px] items-center gap-2 transition-colors hover:text-brass"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    +372 7 303 555
                  </a>
                  <span className="inline-flex min-h-[40px] items-center gap-2">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Lossi 28, Tartu
                  </span>
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none px-8 font-display text-[15px]"
              >
                <a href="mailto:pyss@pyss.ee?subject=Grupiürituse%20pakkumine">
                  Küsi pakkumist <Users aria-hidden="true" />
                </a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <HistoryFooter />
    </div>
  );
}
