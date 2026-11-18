export type MenuCategory =
  | "snakid"
  | "pearoad"
  | "magusat"
  | "joogimenuu"
  | "gruppidele";

export interface MenuItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  categories: MenuCategory[];
  dietary?: ("V" | "L" | "G")[];
  image: string;
  note?: string;
  drinkMenuPages?: { title: string; image: string }[];
  isGroupMenuOverview?: boolean;
}

export const MENU_CATEGORIES: { id: "koik" | MenuCategory; label: string }[] = [
  { id: "koik", label: "Kõik" },
  { id: "snakid", label: "Snäkid" },
  { id: "pearoad", label: "Pearoad" },
  { id: "magusat", label: "Midagi magusat" },
  { id: "joogimenuu", label: "Joogimenüü" },
  { id: "gruppidele", label: "Grupidele" },
];

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  snakid: "Snäkid",
  pearoad: "Pearoad",
  magusat: "Midagi magusat",
  joogimenuu: "Joogimenüü",
  gruppidele: "Grupidele",
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "angersaga-kookose-pankokattega",
    name: "Angersäga kookose-pankokattega",
    shortDescription:
      "Krõbe angersäga maapähklikastme, põletatud kartuli ja värskete aedviljadega.",
    fullDescription:
      "Kookose-pankokattes küpsetatud angersäga, serveeritud kreemja maapähklikastme, põletatud kartulite ja hooajaliste aedviljadega.",
    price: "23 €",
    categories: ["pearoad"],
    dietary: ["L"],
    image: "/images/menu/anger.png",
  },
  {
    id: "bataadipallid-tsillimajoneesiga",
    name: "Bataadipallid tšillimajoneesiga",
    shortDescription:
      "Krõbedad bataadipallid ürtidega, serveeritud särtsaka tšillimajoneesiga.",
    fullDescription:
      "Kuldpruuniks küpsetatud bataadipallid, mis sobivad suurepäraselt nii õlle kõrvale näksimiseks kui kergeks eelroaks koos tšillimajoneesiga.",
    price: "8 €",
    categories: ["snakid"],
    dietary: ["V"],
    image: "/images/menu/bataadipalli.png",
  },
  {
    id: "kanasnitsel-lillkapsakreemiga",
    name: "Kanašnitsel lillkapsakreemiga",
    shortDescription:
      "Krõbe kanašnitsel siidise lillkapsakreemi, ahjuköögiviljade ja karrikastmega.",
    fullDescription:
      "Mahlane kanašnitsel kuldses paneeringus, mille kõrval on sametine lillkapsakreem, röstitud ahjuköögiviljad ning aromaatne karrikaste.",
    price: "16 €",
    categories: ["pearoad"],
    image: "/images/menu/kanasnitsel.png",
  },
  {
    id: "poke-kauss-krevettidega",
    name: "Poke-kauss krevettidega",
    shortDescription:
      "Krevetid, sushiriis, värsked köögiviljad ja seesamiseemned kerges kastmes.",
    fullDescription:
      "Värske ja toitev poke-kauss mahlakate krevettide, koheva riisi, krõmpsuvate köögiviljade ja tasakaalustatud kastmega.",
    price: "11 €",
    categories: ["pearoad", "snakid"],
    dietary: ["L"],
    image: "/images/menu/poke-krevett.png",
  },
  {
    id: "mac-and-cheese-lastemenuu",
    name: "Mac and cheese",
    shortDescription:
      "Kreemjas juustupasta Püssirohukeldri lastemenüüst.",
    fullDescription:
      "Laste lemmik: siidises juustukastmes pasta, mis valmib värskelt köögis ja sobib ka väiksemaks soojaks kõhutäieks.",
    price: "6,50 €",
    categories: ["pearoad", "snakid"],
    note: "Lastemenüü",
    image: "/images/menu/macandchees.png",
  },
  {
    id: "poke-kauss-seentega",
    name: "Poke-kauss seentega",
    shortDescription:
      "Röstitud seened, riis, värsked köögiviljad ja maitserikas kaste.",
    fullDescription:
      "Taimne ja laktoosivaba poke-kauss maitsestatud seente, riisi ning hooajaliste värskete köögiviljadega.",
    price: "9 €",
    categories: ["pearoad", "snakid"],
    dietary: ["V", "L"],
    image: "/images/menu/poke-seen.png",
  },
  {
    id: "laetud-friikad-birria-veiselihaga",
    name: "Laetud friikad birria veiselihaga",
    shortDescription:
      "Krõbedad friikartulid pikalt hautatud birria veiseliha ja kastmega.",
    fullDescription:
      "Rikkalik roog krõbedate friikartulite, mahlase ja pikalt haudunud birria veiseliha ning maitseküllase lisandiga.",
    price: "15 €",
    categories: ["pearoad"],
    image: "/images/menu/laetud-friikad.png",
  },
  {
    id: "angersaga-rillette",
    name: "Angersäga rillette",
    shortDescription:
      "Kreemjas angersäga määre krõbeda leiva ja lisanditega.",
    fullDescription:
      "Hõrk ja maitseküllane angersägast valmistatud rillette, mis sobib suurepäraselt seltskonnaga jagamiseks ja vaadiõlle kõrvale.",
    price: "13 €",
    categories: ["snakid"],
    image: "/images/menu/rillette.png",
  },
  {
    id: "poke-kauss-kanaga",
    name: "Poke-kauss kanaga",
    shortDescription:
      "Küpsetatud kana, riis, värske salat ja kerge kaste.",
    fullDescription:
      "Toitev poke-kauss mahlase kana, riisi, värskete aedviljade ja maitseküllase kastmega.",
    price: "10 €",
    categories: ["pearoad"],
    dietary: ["L"],
    image: "/images/menu/poke-kana.png",
  },
  {
    id: "searibi-varske-salati-ja-kartulipureega",
    name: "Searibi värske salati ja kartulipüreega",
    shortDescription:
      "Aeglaselt küpsetatud searibi siidise kartulipüree ja värske salatiga.",
    fullDescription:
      "Püssirohukeldri klassikaline tugev kõhutäis: mahlane küpsetatud searibi, kreemjas kartulipüree ja värske hooajaline salat.",
    price: "24 €",
    categories: ["pearoad"],
    image: "/images/menu/ribi26-2.jpg",
  },
  {
    id: "pussika-seljanka-kahurikuulis",
    name: "Püssika seljanka kahurikuulis",
    shortDescription:
      "Patenteeritud Püssirohukeldri seljanka kuumalt rukkileiva „kahurikuulis“.",
    fullDescription:
      "Püssika seljanka kahurikuulis on patenteeritud ja Püssirohukelder on ainuke koht maailmas, kus seda maitsta saab. Rikkalik lihaseljanka serveeritakse krõbeda leivakukli sees.",
    price: "10 €",
    categories: ["pearoad", "snakid"],
    note: "Patenteeritud firmaroog",
    image: "/images/menu/seljanka26.jpg",
  },
  {
    id: "krobe-sealihaamps",
    name: "Krõbe sealihaamps",
    shortDescription:
      "Krõbedaks küpsetatud sealihaampsud sobiva dipikastmega.",
    fullDescription:
      "Kuldse koorikuga mahlased sealihaampsud, mis on loodud just keldrivõlvide all vaadiõlle kõrvale nautimiseks.",
    price: "8 €",
    categories: ["snakid"],
    dietary: ["L"],
    image: "/images/menu/sealihaamps26-2.jpg",
  },
  {
    id: "lillkapsasteik-pahkli-kookoskastmega",
    name: "Lillkapsasteik pähkli-kookoskastmega",
    shortDescription:
      "Röstitud lillkapsasteik pähkli-kookoskastme ja tšilli crispiga.",
    fullDescription:
      "Taimne, laktoosi- ja gluteenivaba roog: karamelliseerunud lillkapsasteik rikkalikus pähkli-kookoskastmes koos vürtsika tšilli crispiga.",
    price: "8 €",
    categories: ["pearoad", "snakid"],
    dietary: ["V", "L", "G"],
    image: "/images/menu/lillkapsa26.jpg",
  },
  {
    id: "joogimenuu-2026",
    name: "Joogimenüü 2026",
    shortDescription:
      "Vaadiõlled, Püssirohu Punane, siidrid, kokteilid ja karastusjoogid.",
    fullDescription:
      "Hea sõber! Sellest joogimenüüst leiad nii mõndagi meelepärast janutamise vastu — alates patenteeritud Püssirohu Punasest ja liitristest kannudest kuni kokteilide ning alkoholivabade jookideni. Viipa ja Sulle kantakse palju kannad!",
    price: "Vaata kaarti",
    categories: ["joogimenuu"],
    note: "4 lehekülge · 2026",
    image: "/images/menu/dsc2284.jpg",
    drinkMenuPages: [
      {
        title: "Vaadi- ja pudeliõlled, siidrid",
        image: "/images/menu/menuu-oktoober-2026-lk-3.jpg",
      },
      {
        title: "Veinid ja vahuveinid",
        image: "/images/menu/menuu-oktoober-2026-lk-4.jpg",
      },
      {
        title: "Kokteilid ja kanged joogid",
        image: "/images/menu/menuu-oktoober-2026-lk-5.jpg",
      },
      {
        title: "Kuumad joogid ja karastusjoogid",
        image: "/images/menu/menuu-oktoober-2026-lk-6.jpg",
      },
    ],
  },
  {
    id: "antipasti-vaagen",
    name: "Antipasti vaagen",
    shortDescription:
      "Rikkalik valik juuste, sinke, oliive ja suupisteid jagamiseks.",
    fullDescription:
      "Seltskonnale mõeldud rikkalik antipasti vaagen hoolikalt valitud juustude, lihalõikude, oliivide ja krõbedate lisanditega.",
    price: "32 €",
    categories: ["pearoad", "snakid"],
    image: "/images/menu/anti-pasti.jpg",
  },
  {
    id: "praeleivad-kuuslaugukastmega",
    name: "Praeleivad küüslaugukastmega",
    shortDescription:
      "Klassikalised krõbedad rukkileivad rikkaliku küüslaugudipiga.",
    fullDescription:
      "Õllerestorani ajatu klassika: värskelt praetud krõbedad musta leiva kangid koos külma küüslaugukastmega.",
    price: "6,50 €",
    categories: ["snakid"],
    image: "/images/menu/praeleivad.jpg",
  },
  {
    id: "domino-kook-maasikakastmega",
    name: "Domino kook maasikakastmega",
    shortDescription:
      "Küpsisepõhine Domino kook, serveeritud värske maasikakastmega.",
    fullDescription:
      "Rikkaliku šokolaadiküpsise ja kreemi kihiline Domino kook, mida täiendab särtsakas maasikakaste.",
    price: "6,50 €",
    categories: ["magusat"],
    image: "/images/menu/dominokook.jpg",
  },
  {
    id: "veganpelmeenid",
    name: "Veganpelmeenid",
    shortDescription:
      "Krõbedad taimsed pelmeenid värske aiaürdidipiga.",
    fullDescription:
      "Taimne ja laktoosivaba suupiste või kergem pearoog — kuldpruunid veganpelmeenid maitsva aiaürdikastmega.",
    price: "8 €",
    categories: ["pearoad", "snakid"],
    dietary: ["V", "L"],
    image: "/images/menu/vegepelmeen.jpg",
  },
  {
    id: "kohupiimapontsikud-karamellijaatisega",
    name: "Kohupiimapontšikud karamellijäätisega",
    shortDescription:
      "Soojad õhulised kohupiimapontšikud karamellijäätisega.",
    fullDescription:
      "Kodused kuldpruunid kohupiimapontšikud, mille kõrval sulab kreemjas karamellijäätis.",
    price: "7,50 €",
    categories: ["magusat"],
    image: "/images/menu/kohupiimapall.jpg",
  },
  {
    id: "tiigerkrevetid-voi-kuuslaugukastmes",
    name: "Tiigerkrevetid või-küüslaugukastmes",
    shortDescription:
      "Mahlased tiigerkrevetid aromaatses või- ja küüslaugukastmes.",
    fullDescription:
      "Pannil küpsetatud tiigerkrevetid rikkalikus küüslaugu-võikastmes, ideaalne nii jagamiseks kui eelroaks.",
    price: "15 €",
    categories: ["snakid"],
    image: "/images/menu/krevett1.jpg",
  },
  {
    id: "frititud-marineeritud-kurk-meega",
    name: "Frititud marineeritud kurk meega",
    shortDescription:
      "Krõbedaks frititud hapukurgiviilud maheda meega.",
    fullDescription:
      "Üllatavalt sõltuvusttekitav õllesnäkk: krõbedas paneeringus marineeritud kurk, mida tasakaalustab looduslik mesi.",
    price: "6,50 €",
    categories: ["snakid"],
    image: "/images/menu/fritkurk1.jpg",
  },
  {
    id: "juustupallid-kuuslaugukastmega",
    name: "Juustupallid küüslaugukastmega",
    shortDescription:
      "Kuldse koorikuga sulavad juustupallid küüslaugudipiga.",
    fullDescription:
      "Seest venivad ja väljast krõbedad juustupallid, serveeritud majaküüslaugukastmega.",
    price: "8 €",
    categories: ["snakid"],
    image: "/images/menu/juustupallid-e1697749081636.jpg",
  },
  {
    id: "kasitoo-jaatisevalik",
    name: "Käsitöö jäätisevalik",
    shortDescription:
      "Kondenspiima-, karamelli- ja saskatoonimarja käsitööjäätis.",
    fullDescription:
      "Gluteenivaba valik kolmest käsitööjäätisest: kreemjas kondenspiim, karamell ning marjane saskatoon.",
    price: "7,50 €",
    categories: ["magusat"],
    dietary: ["G"],
    image: "/images/menu/jats-sokolaad.jpg",
  },
  {
    id: "bruleekreem",
    name: "Brüleekreem",
    shortDescription:
      "Klassikaline vanilline brüleekreem krõbeda karamellikoorikuga.",
    fullDescription:
      "Prantsuse klassika Püssirohukeldri võtmes: siidine vanillikreem värskelt karamelliseeritud suhkrukooriku all.",
    price: "6,50 €",
    categories: ["magusat"],
    image: "/images/menu/bruleekreem.jpg",
  },
  {
    id: "poissmehe-panniroog",
    name: "Poissmehe panniroog",
    shortDescription:
      "Rammus panniroog kartuli, liha, muna ja soolaste lisanditega.",
    fullDescription:
      "Tõeliselt kodune ja toitev pannitäis, mis on Püssirohukeldri külaliste pikaajaline lemmik nii lõunaks kui õhtuks.",
    price: "14 €",
    categories: ["pearoad", "snakid"],
    image: "/images/menu/poissmees-2023.jpg",
  },
  {
    id: "sokolaadifondant",
    name: "Šokolaadifondant",
    shortDescription:
      "Soe vedela südamega šokolaadikook vanillijäätisega.",
    fullDescription:
      "Värskelt ahjust tulnud tume šokolaadifondant voolava šokolaadisüdame ja külma jäätisega.",
    price: "10 €",
    categories: ["magusat"],
    image: "/images/menu/magus2023.jpg",
  },
  {
    id: "grupimenuu-2026",
    name: "Grupimenüü 2026",
    shortDescription:
      "Kuus valmis grupimenüüd seltskondadele, sh veganvalik.",
    fullDescription:
      "Püssirohukeldri 2026. aasta grupimenüü pakub kuut läbimõeldud kahe- ja kolmekäigulist komplekti suurematele seltskondadele (alates 25 € inimese kohta). Ruumide rent on toitlustuse tellimisel tasuta.",
    price: "25 – 38 €",
    categories: ["gruppidele"],
    note: "6 komplekti · alates 25 €/in",
    image: "/images/grupimenuu.jpg",
    isGroupMenuOverview: true,
  },
  {
    id: "seltskonnavaagen",
    name: "Seltskonnavaagen",
    shortDescription:
      "Suur jagamisvaagen soojade ja külmade suupistetega seltskonnale.",
    fullDescription:
      "Külluslik valik Püssirohukeldri populaarseimaid suupisteid ja kastmeid — loodud mitmekesi jagamiseks pika laua taga.",
    price: "36 €",
    categories: ["pearoad", "snakid"],
    image: "/images/menu/seltskonna22.jpg",
  },
  {
    id: "grillburger-peekoniga",
    name: "Grillburger peekoni ja saskatooni BBQ kastmega",
    shortDescription:
      "Mahlane veiselihaburger peekoni, saskatooni BBQ kastme ja friikartulitega.",
    fullDescription:
      "Käsitööburger grillitud pihvi, krõbeda peekoni, erilise saskatooni BBQ kastme ja kuldsete friikartulitega.",
    price: "16 €",
    categories: ["pearoad"],
    image: "/images/menu/img_0765.jpg",
  },
  {
    id: "seakoot-urdi-kartulipureega",
    name: "Seakoot ürdi-kartulipüreega",
    shortDescription:
      "Ahjus röstitud seakoot ürdi-kartulipüree, hapukapsa ja praeleemekastmega.",
    fullDescription:
      "Püssirohukeldri tõeline lipulaev: krõbeda kamaraga mahlane seakoot, ürdine kartulipüree, hautatud hapukapsas ja tummine praeleemekaste.",
    price: "25 €",
    categories: ["pearoad"],
    image: "/images/menu/img_0606.jpg",
  },
  {
    id: "sealihasnitsel-rosmariinikartuliga",
    name: "Sealihašnitsel rosmariinikartuliga",
    shortDescription:
      "Kuldpruun sealihašnitsel rosmariinikartuli ning hapukapsa või salatiga.",
    fullDescription:
      "Suur ja krõbe sealihašnitsel ahjus röstitud rosmariinikartulite, koorese kastme ning valikuliselt kas hapukapsa või värske salatiga.",
    price: "14 €",
    categories: ["pearoad"],
    image: "/images/menu/snitsel2022.jpg",
  },
  {
    id: "mulgipuder-kuklis",
    name: "Mulgipuder kuklis",
    shortDescription:
      "Eestimaine mulgipuder leivakuklis suitsuliha, praesibula ja hapukoorega.",
    fullDescription:
      "Traditsiooniline eestimaine mulgipuder värskelt küpsetatud leivakuklis, rikkaliku suitsuliha, krõbeda praesibula ja külma hapukoorega.",
    price: "13 €",
    categories: ["pearoad"],
    image: "/images/menu/mulgipuder.jpg",
  },
  {
    id: "glasuuritud-kanatiivad",
    name: "Glasuuritud kanatiivad kastmega",
    shortDescription:
      "Mahlased glasuuritud kanatiivad sobiva kastmega.",
    fullDescription:
      "Maitsvas glasuuris küpsetatud kanatiivad, serveeritud värskendava dipikastmega.",
    price: "8 €",
    categories: ["snakid"],
    image: "/images/menu/kanatiivad-2022.jpg",
  },
  {
    id: "lohe-kreemsupp-kuklis",
    name: "Lõhe-kreemsupp kuklis",
    shortDescription:
      "Sametine lõhe-kooresupp krõbedas leivakuklis.",
    fullDescription:
      "Püssirohukeldri teine kuulus kahurikuuli-supp: rikkalik koorene lõhesupp, serveeritud seest õõnestatud soojas leivakuklis.",
    price: "10 €",
    categories: ["pearoad"],
    note: "Patenteeritud firmaroog",
    image: "/images/menu/lohesupp.jpeg",
  },
];
