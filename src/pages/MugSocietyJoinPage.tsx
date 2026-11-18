import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Beer,
  Check,
  CheckCircle2,
  ChevronRight,
  Info,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";

const JOIN_STEPS = [
  {
    num: "01",
    title: "Täida vorm",
    text: "Sisesta oma andmed ning nimi, mida soovid oma isiklikule kannule.",
  },
  {
    num: "02",
    title: "Kinnitame avalduse",
    text: "Võtame sinuga ühendust ja saadame kinnituse koos makseinfoga.",
  },
  {
    num: "03",
    title: "Tasu liikmemaks",
    text: "Ühekordne liitumistasu on 150 €, mis sisaldab sinu nimelist kannu.",
  },
  {
    num: "04",
    title: "Oled igavesti seltsi liige",
    text: "Sinu kann ootab sind Püssirohukeldri kannuriiulil igal külastusel.",
  },
  {
    num: "05",
    title: "Naudi seltsiliikme privileege",
    text: "Saku vaadiõlu 5 €/l ning tasuta sissepääs enamikele üritustele.",
  },
];

const PRIVILEGES = [
  "Omanimeline õllekann Püssirohukeldris",
  "Saku vaadiõllede tellimisel liitri hind vaid 5 €",
  "Tasuta sissepääs Püssirohukeldri üritustele (v.a eriüritused)",
  "Värske info toimuvate sündmuste kohta",
];

type CallPermission = "Jah, palun" | "Ei, tänan";

interface JoinSubmission {
  reference: string;
  name: string;
  mugName: string;
  email: string;
  phone: string;
  birthday: string;
  city: string;
  notes: string;
  canCall: CallPermission;
}

export function MugSocietyJoinPage() {
  const [name, setName] = useState("");
  const [mugName, setMugName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [canCall, setCanCall] = useState<CallPermission>("Jah, palun");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<JoinSubmission | null>(null);

  useEffect(() => {
    document.title = "Kannumeeste Seltsiga liitumine – Püssirohukelder";
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Palun sisesta oma nimi.");
      return;
    }
    if (!mugName.trim()) {
      setError("Palun sisesta nimi, mida soovid oma kannule.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Palun sisesta korrektne e-posti aadress.");
      return;
    }
    if (!city.trim()) {
      setError("Palun sisesta oma kodulinn.");
      return;
    }

    const refNumber = `KS-${String(Math.floor(100000 + Math.random() * 900000))}`;
    setSubmitted({
      reference: refNumber,
      name: name.trim(),
      mugName: mugName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      birthday: birthday.trim(),
      city: city.trim(),
      notes: notes.trim(),
      canCall,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSubmitted(null);
    setError(null);
    setName("");
    setMugName("");
    setEmail("");
    setPhone("");
    setBirthday("");
    setCity("");
    setNotes("");
    setCanCall("Jah, palun");
  };

  const mailtoHref = submitted
    ? `mailto:pyss@pyss.ee?subject=${encodeURIComponent(
        `Kannumeeste Seltsiga liitumise avaldus – ${submitted.name}`,
      )}&body=${encodeURIComponent(
        `Tere Püssirohukelder!\n\nSoovin liituda Kannumeeste Seltsiga:\nSinu nimi: ${submitted.name}\nNimi kannul: ${submitted.mugName}\nE-post: ${submitted.email}\nTelefon: ${submitted.phone || "-"}\nSünnipäev: ${submitted.birthday || "-"}\nKodulinn: ${submitted.city}\nKas võime küsimuste korral helistada?: ${submitted.canCall}\nLisainfo restoranile: ${submitted.notes || "-"}\nViitenumber: ${submitted.reference}`,
      )}`
    : "mailto:pyss@pyss.ee";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {/* Compact dark cellar hero matching all subpages */}
        <section className="relative overflow-hidden bg-cellar-deep">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-35"
            style={{ backgroundImage: `url(${A.mugGallery[1]})` }}
          />
          <div className="absolute inset-0 bg-cellar-deep/75" />
          <div className="relative mx-auto max-w-[1160px] px-4 pt-8 pb-10 md:pt-9 md:pb-12 lg:px-6">
            <nav
              className="flex flex-wrap items-center gap-1 text-xs uppercase tracking-[0.16em] text-parchment/80"
              aria-label="Asukoht lehel"
            >
              <Link to="/" className="transition-colors hover:text-brass">
                Avaleht
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <Link
                to="/kannumeestele"
                className="transition-colors hover:text-brass"
              >
                Kannumeestele
              </Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span aria-current="page" className="text-brass">
                Liitumine
              </span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Liitumisavaldus
            </p>
            <h1 className="mt-2 max-w-[780px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Kannumeeste Seltsiga liitumine
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Täida ankeet ja liitu Kannumeeste Seltsiga juba täna — sinu
              omanimeline kann ootab sind Püssirohukeldris.
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
          <section className="mx-auto max-w-[1160px] px-4 py-14 md:py-20 lg:px-6">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:items-start">
              {/* Left Column: Application Form or Confirmation */}
              <div className="border border-border bg-background/90 p-6 shadow-[0_14px_34px_rgba(0,0,0,0.08)] sm:p-8">
                {submitted ? (
                  <div>
                    <div className="flex items-start gap-4 border-b border-border pb-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.22em] text-primary">
                          Avaldus edastatud · {submitted.reference}
                        </p>
                        <h2 className="mt-1 font-display text-[26px] leading-snug text-accent sm:text-[30px]">
                          Tere tulemast, {submitted.name}!
                        </h2>
                        <p className="mt-2 text-[15px] leading-6 text-foreground/85">
                          Sinu Kannumeeste Seltsiga liitumise avaldus on kirja
                          pandud. Saadame kinnituse koos liikmemaksu tasumise
                          infoga aadressile{" "}
                          <strong className="font-semibold text-foreground">
                            {submitted.email}
                          </strong>
                          .
                        </p>
                      </div>
                    </div>

                    <dl className="mt-6 grid gap-4 border-b border-border pb-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Nimi kannul
                        </dt>
                        <dd className="mt-1 font-display text-[21px] font-semibold text-primary">
                          {submitted.mugName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Kodulinn
                        </dt>
                        <dd className="mt-1 font-display text-[19px] text-accent">
                          {submitted.city}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Telefon
                        </dt>
                        <dd className="mt-1 font-display text-[18px] tabular-nums text-foreground">
                          {submitted.phone || "Märkimata"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Sünnipäev
                        </dt>
                        <dd className="mt-1 font-display text-[18px] tabular-nums text-foreground">
                          {submitted.birthday || "Märkimata"}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Kas võime küsimuste korral helistada?
                        </dt>
                        <dd className="mt-1 text-[15px] text-foreground">
                          {submitted.canCall}
                        </dd>
                      </div>
                      {submitted.notes && (
                        <div className="sm:col-span-2">
                          <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            Lisainfo restoranile
                          </dt>
                          <dd className="mt-1 text-[14px] leading-relaxed text-foreground/85">
                            {submitted.notes}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Button
                        asChild
                        size="lg"
                        className="h-12 rounded-none px-7 font-display text-[15px]"
                      >
                        <a href={mailtoHref}>
                          <Mail aria-hidden="true" /> Saada koopia e-postiga
                        </a>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={handleReset}
                        className="h-12 rounded-none border-accent/50 bg-transparent px-6 font-display text-[15px] text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        Esita uus avaldus
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="border-b border-border pb-5">
                      <p className="font-display text-xs uppercase tracking-[0.24em] text-primary">
                        Liitumisankeet
                      </p>
                      <h2 className="mt-1.5 font-display text-[26px] text-accent sm:text-[30px]">
                        Täida ankeet ja liitu juba täna
                      </h2>
                      <p className="mt-2 text-[14px] leading-6 text-muted-foreground">
                        Tärniga (*) tähistatud väljad on kohustuslikud.
                      </p>
                    </div>

                    {error && (
                      <div
                        id="join-error"
                        role="alert"
                        aria-live="assertive"
                        className="mt-5 flex items-start gap-3 border border-destructive/40 bg-destructive/10 px-4 py-3 text-[14px] text-destructive"
                      >
                        <Info
                          className="mt-0.5 h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {/* Sinu nimi* */}
                      <div>
                        <label
                          htmlFor="join-name"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Sinu nimi <span className="text-primary">*</span>
                        </label>
                        <input
                          id="join-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Ees- ja perekonnanimi"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            setError(null);
                          }}
                          required
                          aria-required="true"
                          aria-describedby={error ? "join-error" : undefined}
                          className="mt-1.5 h-11 w-full border border-input bg-parchment/55 px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* Nimi kannul* */}
                      <div>
                        <label
                          htmlFor="join-mug-name"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Nimi kannul <span className="text-primary">*</span>
                        </label>
                        <input
                          id="join-mug-name"
                          type="text"
                          placeholder="Nimi, mis graveeritakse kannule"
                          value={mugName}
                          onChange={(e) => {
                            setMugName(e.target.value);
                            setError(null);
                          }}
                          required
                          aria-required="true"
                          aria-describedby={error ? "join-error" : undefined}
                          className="mt-1.5 h-11 w-full border border-input bg-parchment/55 px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* E-post* */}
                      <div>
                        <label
                          htmlFor="join-email"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          E-post <span className="text-primary">*</span>
                        </label>
                        <input
                          id="join-email"
                          type="email"
                          autoComplete="email"
                          placeholder="nimi@naide.ee"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                          }}
                          required
                          aria-required="true"
                          aria-describedby={error ? "join-error" : undefined}
                          className="mt-1.5 h-11 w-full border border-input bg-parchment/55 px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* Telefon */}
                      <div>
                        <label
                          htmlFor="join-phone"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Telefon
                        </label>
                        <input
                          id="join-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+372 5XXX XXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1.5 h-11 w-full border border-input bg-parchment/55 px-3.5 text-[15px] tabular-nums text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* Sünnipäev */}
                      <div>
                        <label
                          htmlFor="join-birthday"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Sünnipäev
                        </label>
                        <input
                          id="join-birthday"
                          type="text"
                          autoComplete="bday"
                          placeholder="pp.kk.aaaa"
                          value={birthday}
                          onChange={(e) => setBirthday(e.target.value)}
                          className="mt-1.5 h-11 w-full border border-input bg-parchment/55 px-3.5 text-[15px] tabular-nums text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* Kodulinn* */}
                      <div>
                        <label
                          htmlFor="join-city"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Kodulinn <span className="text-primary">*</span>
                        </label>
                        <input
                          id="join-city"
                          type="text"
                          autoComplete="address-level2"
                          placeholder="nt Tartu"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            setError(null);
                          }}
                          required
                          aria-required="true"
                          aria-describedby={error ? "join-error" : undefined}
                          className="mt-1.5 h-11 w-full border border-input bg-parchment/55 px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* Lisainfo restoranile */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="join-notes"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Lisainfo restoranile
                        </label>
                        <textarea
                          id="join-notes"
                          rows={4}
                          placeholder="Lisainfo Püssirohukeldrile..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="mt-1.5 w-full border border-input bg-parchment/55 p-3.5 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* Kas me võime küsimuste korral helistada? */}
                      <fieldset className="sm:col-span-2 border-t border-border pt-5">
                        <legend className="font-display text-[14px] font-semibold text-accent">
                          Kas me võime küsimuste korral helistada?
                        </legend>
                        <div className="mt-3 flex flex-wrap gap-6">
                          {(["Jah, palun", "Ei, tänan"] as const).map(
                            (option) => (
                              <label
                                key={option}
                                className="inline-flex min-h-[40px] cursor-pointer items-center gap-2.5 text-[15px] text-foreground"
                              >
                                <input
                                  type="radio"
                                  name="can-call"
                                  value={option}
                                  checked={canCall === option}
                                  onChange={() => setCanCall(option)}
                                  className="h-4 w-4 accent-primary"
                                />
                                <span>{option}</span>
                              </label>
                            ),
                          )}
                        </div>
                      </fieldset>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                      <Button
                        type="submit"
                        size="lg"
                        className="h-12 rounded-none px-8 font-display text-[16px] tracking-wide"
                      >
                        Saada avaldus <ChevronRight aria-hidden="true" />
                      </Button>
                      <p className="text-[13px] text-muted-foreground">
                        Liitumistasu <strong className="text-accent">150 €</strong>{" "}
                        (ühekordne)
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: 5 steps from live page + Privileges & Contacts */}
              <aside className="space-y-8">
                {/* 5 steps from live pyss.ee/kannumeeste-seltsiga-liitumine/ */}
                <div className="border border-border bg-background/80 p-6 sm:p-7">
                  <p className="font-display text-xs uppercase tracking-[0.24em] text-primary">
                    Samm-sammult
                  </p>
                  <h2 className="mt-1.5 font-display text-[24px] text-accent">
                    Kuidas Seltsiga liituda?
                  </h2>

                  <ol className="mt-6 space-y-4">
                    {JOIN_STEPS.map((step) => (
                      <li
                        key={step.num}
                        className="flex gap-4 border-b border-border/70 pb-4 last:border-b-0 last:pb-0"
                      >
                        <span className="font-display text-[20px] font-semibold tabular-nums text-primary">
                          {step.num}.
                        </span>
                        <div>
                          <h3 className="font-display text-[17px] font-semibold text-accent">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                            {step.text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Privileges & fee dark cellar card */}
                <div className="border border-brass/35 bg-cellar-deep p-6 text-parchment sm:p-7">
                  <div className="flex items-center justify-between gap-3 border-b border-brass/25 pb-4">
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.22em] text-brass">
                        Igavene liikmelisus
                      </p>
                      <p className="mt-1 font-display text-[32px] font-semibold tabular-nums text-parchment">
                        150 €
                      </p>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center border border-brass/40 text-brass">
                      <Beer className="h-6 w-6" aria-hidden="true" />
                    </span>
                  </div>

                  <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-parchment/85">
                    {PRIVILEGES.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-1 h-4 w-4 shrink-0 text-brass"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 space-y-2 border-t border-brass/25 pt-5 text-[14px]">
                    <a
                      href="tel:+3727303555"
                      className="flex min-h-[36px] items-center gap-2.5 font-display text-[17px] text-brass transition-colors hover:text-parchment"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      +372 7 303 555
                    </a>
                    <a
                      href="mailto:pyss@pyss.ee"
                      className="flex min-h-[36px] items-center gap-2.5 text-parchment/85 transition-colors hover:text-brass"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      pyss@pyss.ee
                    </a>
                    <p className="flex min-h-[36px] items-center gap-2.5 text-parchment/85">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      Lossi 28, Tartu
                    </p>
                  </div>
                </div>

                {/* Back to Kannumeestele info */}
                <div className="border border-border bg-secondary/45 p-6">
                  <p className="font-display text-xs uppercase tracking-[0.22em] text-primary">
                    Soovid enne rohkem teada?
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground/85">
                    Loe lähemalt Kannumeeste Seltsi ajaloost, kuulsatest
                    liikmetest ja vaata pilte nimelistest kannudest.
                  </p>
                  <Link
                    to="/kannumeeste-info"
                    className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 font-display text-[15px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-accent"
                  >
                    Vaata lisainfot Kannumeeste Seltsi kohta{" "}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </main>

      <HistoryFooter />
    </div>
  );
}
