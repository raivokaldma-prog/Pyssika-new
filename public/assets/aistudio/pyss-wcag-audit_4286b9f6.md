# pyss-dev.abkommerts.net — WCAG 2.2 AA ligipääsetavuse audit

Kuupäev: 18.11.2026

## Kokkuvõte

Leht on ligipääsetavuse mõttes **väga heas seisus** — selgelt parem, kui online-skannerite 50–80 punkti vihjavad. Automaatne skann üheksal lehel ei leidnud ühtegi kontrasti-, alt-teksti-, sildi- ega struktuurivea. Käsitsi testides leidsin **3 päris WCAG-rikkumist**, mis tuleb enne avalikustamist parandada, ja hulga väiksemaid parandusi.

| Raskus | Arv | Mis |
|---|---|---|
| 🔴 Kriitiline | 1 | Modaalaknad (Programm, Galerii) — fookus ei lähe aknasse ega püsi seal |
| 🟠 Oluline | 2 | Nähtav tekst ei ole nupu nimes (plakatid, keelenupud); broneerimisvormi veateated |
| 🟡 Väike / parim tava | 9 | vt allpool |

**Hinnang:** pärast kolme põhiprobleemi parandamist vastab leht minu hinnangul WCAG 2.2 AA-le. Kriitiline viga on ühes jagatud komponendis, seega üks parandus katab mõlemad lehed.

## Metoodika

**Lehed (9):** `/`, `/menuu`, `/programm`, `/gruppidele`, `/kannumeestele`, `/galerii`, `/broneeri`, `/kontakt`, `/ajalugu`

**Automaatne:** axe-core 4.10.2 (sama mootor, mida kasutavad Lighthouse ja paljud online-skannerid), reeglistikud `wcag2a`, `wcag2aa`, `wcag21a/aa`, `wcag22aa`, `best-practice` ja `experimental`, 1280px laiusel.

**Käsitsi:**
- klaviatuuriga läbimine (Tab/Shift+Tab/Enter/Escape), fookuse järjekord ja nähtavus
- reflow 320px laiusel kõigil 9 lehel (1.4.10)
- tekstivahede test (1.4.12: line-height 1.5, letter-spacing 0.12em jne)
- kontrast ka gradientide ja fotode peal — pikslite kaupa arvutatud, mitte hinnatud
- modaalaknad, mobiilimenüü, broneerimisvormi veakäsitlus
- maamärgid, pealkirjade hierarhia, lingitekstid, keel, sihtmärkide suurus (2.5.8)

**Mida ei testitud:** päris ekraanilugeja (NVDA/VoiceOver), ingliskeelne versioon (veel tegemata), vormi edukas saatmine, kolmandate osapoolte sisu (Google Maps, Matterport, Facebook).

## 🔴 1. Modaalaknad: fookus jääb taustale

**Kus:** `/programm` (plakati suurendus) ja `/galerii` (fotode lightbox) — sama komponent.

**WCAG:** 2.4.3 Focus Order (A), 2.4.11 Focus Not Obscured (Minimum) (AA)

**Mis toimub:**
- Aken avaneb (`role="dialog"`, `aria-modal="true"`, nimega ✓), aga **fookus jääb avamisnupule taustal**.
- Tab liigub **ülekatte all olevate** taustanuppude vahel (testis jõudis fookus „Beerpong" ja „Vaata lähemalt" kaartidele) — klaviatuurikasutaja ei näe, kus ta on, ega jõua akna nuppudeni (Eelmine/Järgmine/Sulge).
- `main` ei ole `inert`, seega ekraanilugeja saab ka tausta lugeda.
- Escape sulgeb akna ✓, aga fookus jääb sinna, kuhu Tab selle viis, mitte avamisnupule.

**Parandus** (lihtsaim on natiivne `<dialog>` + `showModal()`, mis teeb kõik automaatselt):

```js
// avamine
lastTrigger = document.activeElement;
dialog.showModal();            // fookuslõks + tausta inert + Escape tasuta
dialog.querySelector('[data-close]').focus();

// sulgemine
dialog.addEventListener('close', () => lastTrigger?.focus());
```

Kui jääd praeguse `div`-i juurde: avamisel `focus()` sulgemisnupule, `main` ja `header`/`footer` peale `inert`, Tab/Shift+Tab tsükkel akna sees, sulgemisel fookus tagasi avamisnupule.

## 🟠 2. Nähtav tekst puudub nupu ligipääsetavast nimest

**WCAG:** 2.5.3 Label in Name (A)

**a) Programmi plakatid — 21 nuppu.** Nupu sees on nähtav kuupäevamärk „17 NOV", aga `aria-label="Vaata suuremat plakatit: Püssika maleturniir"` kirjutab selle üle. Häälkäsklustega kasutaja, kes ütleb „klõpsa 17 NOV", ei saa nuppu kasutada.

Parandus — nimi peab sisaldama nähtavat teksti, soovitatavalt alguses:

```html
<button aria-label="17. nov – Püssika maleturniir, vaata suuremat plakatit">
```

Või eemalda `aria-label` ja lisa nupu sisse `<span class="sr-only">Püssika maleturniir, vaata suuremat plakatit</span>`.

**b) Keelenupud (lauaarvuti).** Nähtav „Est", nimi „Eesti keel" — „Est" ei sisaldu nimes. „Eng" → „English language" läbib napilt. Mobiilimenüüs on samadel nuppudel `aria-label` hoopis puudu (nimi on lihtsalt „Est"/„Eng").

Parandus: `aria-label="EST – eesti keel"` ja `aria-label="ENG – English" lang="en"`, ühtmoodi nii lauaarvutis kui mobiilis.

## 🟠 3. Broneerimisvormi veakäsitlus

**Kus:** `/broneeri`

**WCAG:** 3.3.1 Error Identification (A), 1.3.1 Info and Relationships (A), 3.3.3 Error Suggestion (AA)

Tühja vormi saatmisel:
- Kuvatakse **ainult üks viga** („Palun sisesta oma nimi."), kuigi ka e-post on tühi — kasutaja avastab vead ükshaaval.
- Sama veateade (`aria-describedby="booking-error"`) on seotud **kolme väljaga, sh juba täidetud Kuupäevaga** — ekraanilugeja ütleb kuupäevaväljal „Palun sisesta oma nimi".
- Väljadel puudub `aria-invalid="true"` ja visuaalne veaseisund (punane raam).
- Veateade on ~750px saatmisnupust kõrgemal ja fookus jääb nupule — suurendusega või klaviatuuriga kasutaja ei näe, mis juhtus. (`role="alert"` on olemas, seega ekraanilugeja kuuleb ✓.)

**Parandus:**
- valideeri kõik väljad korraga;
- iga välja alla oma veatekst (`id="err-name"`), väljal `aria-invalid="true"` + `aria-describedby="err-name"`;
- vigade korral fookus esimesele vigasele väljale;
- üleval kokkuvõte võib jääda, aga linkidena väljadele.

E-posti vea korral anna vihje („Kontrolli, et aadressis oleks @ ja domeen, nt nimi@naide.ee") — see katab 3.3.3.

## 🟡 Väiksemad probleemid ja parimad tavad

**4. Ettemaksu summa uueneb vaikselt** (`/broneeri`) — kui inimeste arvu muuta, muutub „Ettemaks kokku (4 in) 20,00 €", aga ekraanilugeja seda ei kuule. Lisa summa konteinerile `role="status"` (4.1.3 Status Messages).

**5. Virtuaaltuuri lingi silt valetab** (avaleht) — `aria-label` ütleb „…uues aknas", aga `target="_blank"` puudub, link avaneb samas aknas. Eemalda „uues aknas" või lisa `target`. Lisaks on kõrvuti kaks linki samale Matterporti URL-ile (nupp + pilt); kaalu pildi linki `tabindex="-1" aria-hidden="true"` või ühenda üheks.

**6. `<aside>` on pesastatud** (`/broneeri`) — „Kuidas lauda broneerida" `<aside>` on teise maamärgi sees (axe: *landmark-complementary-is-top-level*). Asenda `<section aria-labelledby>` või tõsta tasemele `main` kõrvale.

**7. Hero tunnuslause on H2** (avaleht) — „Üle 300 aasta vanused kivivõlvid on 10,2m kõrgused." on alapealkiri, mitte sektsiooni pealkiri; ekraanilugeja pealkirjade loendis tekib mõttetu sissekanne. Muuda `<p>`-ks.

**8. Statistikaplokid kui pseudo-pealkirjad** (`/kontakt`, „Huvitavaid fakte") — „250 m² Põhikelder" jms on suured paksud `<p>`-d (axe: *p-as-heading*, 4×). Semantiliselt sobib `<dl>` (`<dt>Põhikelder</dt><dd>250 m²</dd>`). Mitte rikkumine, aga lihtne parandus.

**9. „>>" loetakse ette** — „Tutvu menüüga >>" puhul ütleb ekraanilugeja „suurem kui suurem kui". Pane noolele `aria-hidden="true"` (või kasuta SVG-noolt nagu mujal).

**10. Mobiilimenüü Escape** — menüü ei sulgu Escape'iga. Disclosure-mustris pole see kohustuslik, aga oodatud käitumine; lisa ka fookuse tagastus nupule.

**11. Hero tekst mobiilis foto peal** — 320px laiusel on tekst osaliselt ettekandjate foto peal, kus horisontaalne scrim on nõrgem. Mõõtsin pikslite kaupa: 97–99% tausta annab ≥ 4,5:1 (tänu `text-shadow`'le), aga heledate laternate kohal langeb üksikutes punktides ~2,6:1-ni. Madal risk; turvalisem on mobiilis kasutada vertikaalset scrimi (alt tumedam) või tõsta scrimi läbipaistmatust.

**12. Ingliskeelne versioon (tulevikuks)** — ENG-nupp praegu midagi ei tee. Kui EN tuleb: `<html lang="en">`, keelevahetajad **linkidena** (`<a href="/en/…" hreflang="en" lang="en">`), mitte `aria-pressed` nuppudena, sest tegu on navigeerimisega teisele lehele.

## ✅ Mis on korras

- **Kontrast:** kogu tekst läbib 4,5:1 (enamik 10–15:1). Ka gradientidel (päis, tumedad sektsioonid) ja ajaloo-riba pärgamentfoto peal (halvim 5,4:1). Vormiväljade raamid 4,1:1 (1.4.11 ✓), placeholder 4,55:1.
- **Klaviatuur:** kõik elemendid kättesaadavad, loogiline järjekord, igal elemendil nähtav 2px fookusraam. „Liigu põhisisu juurde" link ilmub fookusel ja `main` on `tabindex="-1"` ✓.
- **Päis ei ole sticky**, nii et fookus ei kao päise alla (2.4.11 ✓ väljaspool modaale).
- **Reflow:** 320px laiusel ühelgi lehel horisontaalset kerimist (1.4.10 ✓).
- **Tekstivahed:** 1.4.12 testiga midagi ei lõigu ära ✓.
- **Struktuur:** igal lehel üks H1, unikaalne `<title>`, `lang="et"`, maamärgid (`header`, nimetatud `nav`, `main`, `footer`), murupuru.
- **Pildid:** sisulistel piltidel kirjeldav alt, dekoratiivsetel `alt=""` ✓. Galeriis 21 pilti, kõigil alt.
- **Vorm:** kõigil väljadel `<label>`, kohustuslikud märgitud ja selgitatud, `autocomplete` nimel/e-postil/telefonil (1.3.5 ✓).
- **Mobiilimenüü:** `aria-expanded`, `aria-controls`, nimi muutub „Ava/Sulge menüü" ✓.
- **Sihtmärgid:** nupud ≥ 36px, mobiilis 44–49px (2.5.8 ✓). Jaluse väiksemad lingid on lauses (erand kehtib).
- **Liikumine:** `prefers-reduced-motion` on CSS-is olemas, automaatselt liikuvat sisu pole.
- **Kaart:** Google Mapsi iframe'il kirjeldav `title` ✓.

## Soovitatud järjekord

1. Modaalkomponent → `<dialog>` + `showModal()` (katab Programmi ja Galerii)
2. Broneerimisvormi väljapõhised vead + `aria-invalid` + fookus esimesele veale
3. Plakatinuppude ja keelenuppude `aria-label`-id
4. `role="status"` ettemaksu summale, virtuaaltuuri lingi silt, hero H2 → `<p>`
5. Ülejäänud väikesed asjad

Pärast parandusi tasub teha üks ring NVDA (Windows) või VoiceOveriga (Mac/iPhone) — eriti modaalid ja vorm.
