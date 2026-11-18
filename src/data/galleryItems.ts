export type GalleryCategory = "yldine" | "ajalugu" | "pidu";

export interface GalleryPhoto {
  id: string;
  category: GalleryCategory;
  src: string;
  caption: string;
}

export const GALLERY_CATEGORIES: {
  id: GalleryCategory;
  label: string;
  subtitle: string;
}[] = [
  {
    id: "yldine",
    label: "Pildid Püssirohukeldrist",
    subtitle: "300-aastased kivivõlvid, 10,2 meetri kõrgune saal, Schrammi kamber ja Katariina tuba.",
  },
  {
    id: "ajalugu",
    label: "Ajaloolised pildid",
    subtitle: "Arhiivifotod 1980ndate kohvik-restoranist, varieteeõhtutest ja vanast sissepääsust.",
  },
  {
    id: "pidu",
    label: "Pildid pidudest",
    subtitle: "Elav muusika, täismaja kontserdid ja meeldejäävad õhtud keldrivõlvide all.",
  },
];

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  yldine: "Püssirohukelder",
  ajalugu: "Ajalugu",
  pidu: "Peod ja elav muusika",
};

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    "id": "yldine-1",
    "category": "yldine",
    "src": "/images/gallery/yldine/01-scuur4ea51b84c8743imgp1597.jpg",
    "caption": "Schrammi kamber"
  },
  {
    "id": "yldine-2",
    "category": "yldine",
    "src": "/images/gallery/yldine/02-luqhj49b7c59e723e5pyss.jpg",
    "caption": "Sissepääs - siit leiad ka kinnituse, et Püssirohukelder on maailma kõrgeima laega pubi/õllerestoran (Guinness World Records)"
  },
  {
    "id": "yldine-3",
    "category": "yldine",
    "src": "/images/gallery/yldine/03-kata.jpg",
    "caption": "Katariina tuba"
  },
  {
    "id": "yldine-4",
    "category": "yldine",
    "src": "/images/gallery/yldine/04-jphion_pyss_1_sisevaade.jpg",
    "caption": "Milline vaade, 300 aastat ajalugu,10,2 meetrit kõrgust"
  },
  {
    "id": "yldine-5",
    "category": "yldine",
    "src": "/images/gallery/yldine/05-img_7749.jpg",
    "caption": "Püssirohukeldri patenteeritud õlu Püssirohu Punane"
  },
  {
    "id": "yldine-6",
    "category": "yldine",
    "src": "/images/gallery/yldine/06-img_2656.jpg",
    "caption": "Kannumeeste Seltsi liikmete kannud"
  },
  {
    "id": "yldine-7",
    "category": "yldine",
    "src": "/images/gallery/yldine/07-img_2637.jpg",
    "caption": "Hubane õhtupoolik"
  },
  {
    "id": "yldine-8",
    "category": "yldine",
    "src": "/images/gallery/yldine/08-img_2622.jpg",
    "caption": "Sõbralik personal"
  },
  {
    "id": "yldine-9",
    "category": "yldine",
    "src": "/images/gallery/yldine/09-img_2584.jpg",
    "caption": "Ettevalmistused õhtuseks peoks"
  },
  {
    "id": "yldine-10",
    "category": "yldine",
    "src": "/images/gallery/yldine/10-img_2574-copy.jpg",
    "caption": "Hubane ja viisakas"
  },
  {
    "id": "yldine-11",
    "category": "yldine",
    "src": "/images/gallery/yldine/11-hvqbo49b7c5dece63c5649912_xbjerl.jpg",
    "caption": ""
  },
  {
    "id": "yldine-12",
    "category": "yldine",
    "src": "/images/gallery/yldine/12-amuii4ea51b26f0811imgp1595.jpg",
    "caption": "Schrammi kamber"
  },
  {
    "id": "yldine-13",
    "category": "yldine",
    "src": "/images/gallery/yldine/13-582056_10150777051154350_1931752679_n.jpg",
    "caption": "Terminaator esinemas"
  },
  {
    "id": "yldine-14",
    "category": "yldine",
    "src": "/images/gallery/yldine/14-543682_10150777056664350_1638724902_n.jpg",
    "caption": "Terminaator esinemas"
  },
  {
    "id": "yldine-15",
    "category": "yldine",
    "src": "/images/gallery/yldine/15-543222_10150777054259350_435122287_n.jpg",
    "caption": "Midagi mõdu kõrvale?"
  },
  {
    "id": "yldine-16",
    "category": "yldine",
    "src": "/images/gallery/yldine/16-16980_271058374349_7977805_n.jpg",
    "caption": "Püssirohukeldri esine suvel"
  },
  {
    "id": "yldine-17",
    "category": "yldine",
    "src": "/images/gallery/yldine/17-16980_268546614349_6873436_n.jpg",
    "caption": "Püssirohukeldri sõbralik personal"
  },
  {
    "id": "yldine-18",
    "category": "yldine",
    "src": "/images/gallery/yldine/18-16980_268501889349_147235_n.jpg",
    "caption": ""
  },
  {
    "id": "yldine-19",
    "category": "yldine",
    "src": "/images/gallery/yldine/19-16980_268409449349_2541556_n.jpg",
    "caption": ""
  },
  {
    "id": "yldine-20",
    "category": "yldine",
    "src": "/images/gallery/yldine/20-16980_268409419349_3274371_n.jpg",
    "caption": ""
  },
  {
    "id": "yldine-21",
    "category": "yldine",
    "src": "/images/gallery/yldine/21-16980_268382259349_617567_n.jpg",
    "caption": "Püssirohukeldri esine suvel"
  },
  {
    "id": "ajalugu-22",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/22-73030_457828514349_6821973_n.jpg",
    "caption": "Selline oli sissepääs vanasti. Kes mäletab veel neid aegu?"
  },
  {
    "id": "ajalugu-23",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/23-418224_10150641095319350_2098880153_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-24",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/24-409480_10150539061904350_915271723_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-25",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/25-409072_10150539061624350_2050607213_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-26",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/26-408856_10150539060554350_1484941401_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-27",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/27-408155_10150539060694350_1950482844_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-28",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/28-405668_10150539060319350_1703426354_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-29",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/29-404458_10150539062079350_592549918_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-30",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/30-402025_10150539059689350_320034964_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-31",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/31-400104_10150539060914350_877962417_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-32",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/32-398649_10150539060454350_369957629_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-33",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/33-397931_10150539061404350_456860637_n.jpg",
    "caption": "Varietee! Toimus kolmapäeval, reedel ja laupäeval algusega kell 22.30"
  },
  {
    "id": "ajalugu-34",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/34-396731_10150539059784350_1872393392_n.jpg",
    "caption": "Nagu näha, müüdi juba ka Fantat!"
  },
  {
    "id": "ajalugu-35",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/35-396392_10150539061004350_148271092_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-36",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/36-395847_10150539061319350_1847709487_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-37",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/37-395822_10150539060009350_475742167_n.jpg",
    "caption": "Endine teise korruse baar."
  },
  {
    "id": "ajalugu-38",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/38-38403_415244979349_2959098_n.jpg",
    "caption": "Aastal 1982"
  },
  {
    "id": "ajalugu-39",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/39-38403_415244974349_6993748_n.jpg",
    "caption": "Aastal 1982"
  },
  {
    "id": "ajalugu-40",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/40-38378_415248794349_8025201_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-41",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/41-155471_10150539060164350_481635670_n.jpg",
    "caption": ""
  },
  {
    "id": "ajalugu-42",
    "category": "ajalugu",
    "src": "/images/gallery/ajalugu/42-155405_10150539060269350_1879841979_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-43",
    "category": "pidu",
    "src": "/images/gallery/pidu/43-term.jpg",
    "caption": ""
  },
  {
    "id": "pidu-44",
    "category": "pidu",
    "src": "/images/gallery/pidu/44-img_7749.jpg",
    "caption": "Püssirohu Punane teeb peo lõbusamaks"
  },
  {
    "id": "pidu-45",
    "category": "pidu",
    "src": "/images/gallery/pidu/45-img_2698.jpg",
    "caption": ""
  },
  {
    "id": "pidu-46",
    "category": "pidu",
    "src": "/images/gallery/pidu/46-579056_10150777056999350_1730959032_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-47",
    "category": "pidu",
    "src": "/images/gallery/pidu/47-543682_10150777056664350_1638724902_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-48",
    "category": "pidu",
    "src": "/images/gallery/pidu/48-534944_10150777049664350_2010447005_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-49",
    "category": "pidu",
    "src": "/images/gallery/pidu/49-529845_10150777049954350_1410160250_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-50",
    "category": "pidu",
    "src": "/images/gallery/pidu/50-422861_10150664096264350_2021279806_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-51",
    "category": "pidu",
    "src": "/images/gallery/pidu/51-421118_10150664097219350_1444492887_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-52",
    "category": "pidu",
    "src": "/images/gallery/pidu/52-419352_10150664096614350_328898295_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-53",
    "category": "pidu",
    "src": "/images/gallery/pidu/53-399171_10150777050594350_768793792_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-54",
    "category": "pidu",
    "src": "/images/gallery/pidu/54-399032_10150777059174350_107550359_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-55",
    "category": "pidu",
    "src": "/images/gallery/pidu/55-306191_10150777053274350_1604074663_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-56",
    "category": "pidu",
    "src": "/images/gallery/pidu/56-303449_10150777052354350_518329600_n.jpg",
    "caption": ""
  },
  {
    "id": "pidu-57",
    "category": "pidu",
    "src": "/images/gallery/pidu/57-16980_268409419349_3274371_n.jpg",
    "caption": ""
  }
];
