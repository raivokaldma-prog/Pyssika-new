import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Info,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { Header } from "../components/site/Header";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";
import { Button } from "../components/ui/button";

const TIME_SLOTS = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

const STEPS = [
  {
    num: "01",
    title: "Täida vorm",
    text: "Vali sobiv kuupäev, kellaaeg ja külaliste arv ning sisesta oma kontaktandmed.",
  },
  {
    num: "02",
    title: "Kinnitame broneeringu",
    text: "Saadame sulle kinnituskirja koos ettemaksu tasumise infoga e-postile.",
  },
  {
    num: "03",
    title: "Tule kohapeale, ütle nimi",
    text: "Saabudes ütle teenindajale oma nimi — laud ootab sind kivivõlvide all.",
  },
  {
    num: "04",
    title: "Naudi head ja paremat",
    text: "Tasutud ettemaks arvestatakse kohapeal sinu lõpparvest täies ulatuses maha.",
  },
];

const DEPOSIT_PER_PERSON = 5;
const HERO_IMAGE = "/images/gallery/yldine/07-img_2637.jpg";

function getLocalDateString(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(isoDate: string): string {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${d}.${m}.${y}`;
}

function formatEur(amount: number): string {
  return `${amount.toFixed(2).replace(".", ",")} €`;
}

interface BookingSubmission {
  reference: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  totalDeposit: number;
}

type BookingField = "date" | "time" | "name" | "email" | "guests";

const FIELD_IDS: Record<BookingField, string> = {
  date: "booking-date",
  time: "booking-time",
  name: "booking-name",
  email: "booking-email",
  guests: "booking-guests",
};

const FIELD_ORDER: BookingField[] = ["date", "time", "name", "email", "guests"];

export function BookingPage() {
  const todayStr = useMemo(() => getLocalDateString(0), []);
  const tomorrowStr = useMemo(() => getLocalDateString(1), []);

  const [date, setDate] = useState(tomorrowStr);
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState<string>("4");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Partial<Record<BookingField, string>>>({});
  const [submitted, setSubmitted] = useState<BookingSubmission | null>(null);

  useEffect(() => {
    document.title = "Laua broneerimine – Püssirohukelder";
  }, []);

  const parsedGuests = useMemo(() => {
    const n = Number.parseInt(guests, 10);
    if (Number.isNaN(n) || n < 0) return 0;
    return Math.min(n, 300);
  }, [guests]);

  const totalDeposit = parsedGuests * DEPOSIT_PER_PERSON;
  const isSameDay = date === todayStr;

  const clearFieldError = (field: BookingField) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: Partial<Record<BookingField, string>> = {};

    if (!date) {
      nextErrors.date = "Palun vali broneeringu kuupäev.";
    } else if (date < todayStr) {
      nextErrors.date = "Palun vali tänane või tulevane kuupäev.";
    } else if (isSameDay) {
      nextErrors.date =
        "Samal päeval saab lauda broneerida ainult telefoni teel (+372 7 303 555) või kohapeal.";
    }

    if (!time) {
      nextErrors.time = "Palun vali sobiv kellaaeg.";
    }

    if (!name.trim()) {
      nextErrors.name = "Palun sisesta oma nimi.";
    }

    if (!email.trim()) {
      nextErrors.email =
        "Palun sisesta oma e-posti aadress (nt nimi@naide.ee).";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email =
        "Kontrolli, et e-posti aadressis oleks @ ja domeen, nt nimi@naide.ee.";
    }

    if (!parsedGuests || parsedGuests < 1) {
      nextErrors.guests = "Palun sisesta inimeste arv (vähemalt 1).";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) {
        const el = document.getElementById(FIELD_IDS[firstInvalid]);
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    const refNumber = `PK-${String(Math.floor(100000 + Math.random() * 900000))}`;
    setSubmitted({
      reference: refNumber,
      date,
      time,
      guests: parsedGuests,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      totalDeposit: parsedGuests * DEPOSIT_PER_PERSON,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSubmitted(null);
    setErrors({});
    setDate(tomorrowStr);
    setTime("19:00");
    setGuests("4");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
  };

  const errorEntries = FIELD_ORDER.filter((field) => Boolean(errors[field])).map(
    (field) => ({
      field,
      id: FIELD_IDS[field],
      message: errors[field]!,
    }),
  );

  const mailtoHref = submitted
    ? `mailto:pyss@pyss.ee?subject=${encodeURIComponent(
        `Lauabroneering ${formatDisplayDate(submitted.date)} kell ${submitted.time} (${submitted.guests} in) – ${submitted.name}`,
      )}&body=${encodeURIComponent(
        `Tere Püssirohukelder!\n\nSoovin broneerida laua:\nKuupäev: ${formatDisplayDate(
          submitted.date,
        )}\nKellaaeg: ${submitted.time}\nInimeste arv: ${submitted.guests}\nNimi: ${
          submitted.name
        }\nE-post: ${submitted.email}\nTelefon: ${
          submitted.phone || "-"
        }\nEttemaks kokku: ${formatEur(submitted.totalDeposit)}\nLisainfo: ${
          submitted.notes || "-"
        }\nViitenumber: ${submitted.reference}`,
      )}`
    : "mailto:pyss@pyss.ee";

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
              <span aria-current="page" className="text-brass">Broneeri</span>
            </nav>

            <p className="mt-4 font-display text-[13px] uppercase tracking-[0.26em] text-brass">
              Laud ootab sind
            </p>
            <h1 className="mt-2 max-w-[740px] font-display text-[32px] leading-tight text-parchment text-shadow-cellar sm:text-[42px] md:text-[48px]">
              Laua broneerimine
            </h1>
            <p className="mt-3 max-w-[660px] font-display text-[16px] italic leading-relaxed text-parchment/85 md:text-[18px]">
              Broneeri laud maailma kõrgeima laega õllerestorani ja naudi head
              toitu, patenteeritud majaõlut ning elavat muusikat Tartu südames.
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
              {/* Left Column: Booking Form or Confirmation */}
              <div className="border border-border bg-background/90 p-6 shadow-[0_14px_34px_rgba(0,0,0,0.08)] sm:p-8">
                {submitted ? (
                  <div>
                    <div className="flex items-start gap-4 border-b border-border pb-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-display text-[12px] uppercase tracking-[0.22em] text-primary">
                          Päring edastatud · {submitted.reference}
                        </p>
                        <h2 className="mt-1 font-display text-[26px] leading-snug text-accent sm:text-[30px]">
                          Aitäh, {submitted.name}!
                        </h2>
                        <p className="mt-2 text-[15px] leading-6 text-foreground/80">
                          Sinu lauabroneeringu soov on kirja pandud. Saadame
                          kinnituskirja koos ettemaksu tasumise infoga aadressile{" "}
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
                          Kuupäev ja kellaaeg
                        </dt>
                        <dd className="mt-1 font-display text-[19px] tabular-nums text-accent">
                          {formatDisplayDate(submitted.date)} kell {submitted.time}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Inimeste arv
                        </dt>
                        <dd className="mt-1 font-display text-[19px] tabular-nums text-accent">
                          {submitted.guests}{" "}
                          {submitted.guests === 1 ? "külaline" : "külalist"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Ettemaks (arvestatakse arvest maha)
                        </dt>
                        <dd className="mt-1 font-display text-[21px] font-semibold tabular-nums text-primary">
                          {formatEur(submitted.totalDeposit)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                          Kontakttelefon
                        </dt>
                        <dd className="mt-1 font-display text-[18px] tabular-nums text-foreground">
                          {submitted.phone || "Märkimata"}
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
                        Tee uus broneering
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="border-b border-border pb-5">
                      <p className="font-display text-[12px] uppercase tracking-[0.24em] text-primary">
                        Online broneering
                      </p>
                      <h2 className="mt-1.5 font-display text-[26px] text-accent sm:text-[30px]">
                        Broneeri laud
                      </h2>
                      <p className="mt-2 text-[14px] leading-6 text-muted-foreground">
                        Tärniga (*) tähistatud väljad on kohustuslikud.
                      </p>
                    </div>

                    {errorEntries.length > 0 && (
                      <div
                        id="booking-error-summary"
                        role="alert"
                        aria-live="assertive"
                        className="mt-5 border border-destructive/50 bg-destructive/10 px-4 py-3.5 text-[14px] text-destructive"
                      >
                        <p className="flex items-center gap-2 font-semibold">
                          <Info
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span>
                            Palun kontrolli järgmisi välju ({errorEntries.length}
                            ):
                          </span>
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-6">
                          {errorEntries.map((item) => (
                            <li key={item.field}>
                              <a
                                href={`#${item.id}`}
                                className="underline underline-offset-2 hover:text-foreground"
                              >
                                {item.message}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      {/* Date */}
                      <div>
                        <label
                          htmlFor="booking-date"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Kuupäev <span className="text-primary">*</span>
                        </label>
                        <div className="relative mt-1.5">
                          <input
                            id="booking-date"
                            type="date"
                            min={todayStr}
                            value={date}
                            onChange={(e) => {
                              setDate(e.target.value);
                              clearFieldError("date");
                            }}
                            required
                            aria-required="true"
                            aria-invalid={errors.date ? "true" : undefined}
                            aria-describedby={
                              errors.date ? "err-booking-date" : undefined
                            }
                            className={`h-11 w-full border bg-parchment/55 px-3.5 text-[15px] tabular-nums text-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                              errors.date ? "border-destructive" : "border-input"
                            }`}
                          />
                        </div>
                        {errors.date && (
                          <p
                            id="err-booking-date"
                            className="mt-1.5 text-[13px] leading-snug text-destructive"
                          >
                            {errors.date}
                          </p>
                        )}
                        {isSameDay && !errors.date && (
                          <p className="mt-1.5 text-[12.5px] leading-snug text-accent">
                            Samal päeval broneerimiseks helista{" "}
                            <a
                              href="tel:+3727303555"
                              className="font-semibold underline underline-offset-2 hover:text-primary"
                            >
                              +372 7 303 555
                            </a>
                            .
                          </p>
                        )}
                      </div>

                      {/* Time */}
                      <div>
                        <label
                          htmlFor="booking-time"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Kellaaeg <span className="text-primary">*</span>
                        </label>
                        <select
                          id="booking-time"
                          value={time}
                          onChange={(e) => {
                            setTime(e.target.value);
                            clearFieldError("time");
                          }}
                          required
                          aria-required="true"
                          aria-invalid={errors.time ? "true" : undefined}
                          aria-describedby={
                            errors.time ? "err-booking-time" : undefined
                          }
                          className={`mt-1.5 h-11 w-full border bg-parchment/55 px-3.5 text-[15px] tabular-nums text-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                            errors.time ? "border-destructive" : "border-input"
                          }`}
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p
                            id="err-booking-time"
                            className="mt-1.5 text-[13px] leading-snug text-destructive"
                          >
                            {errors.time}
                          </p>
                        )}
                      </div>

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="booking-name"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Sinu nimi <span className="text-primary">*</span>
                        </label>
                        <input
                          id="booking-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Ees- ja perekonnanimi"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            clearFieldError("name");
                          }}
                          required
                          aria-required="true"
                          aria-invalid={errors.name ? "true" : undefined}
                          aria-describedby={
                            errors.name ? "err-booking-name" : undefined
                          }
                          className={`mt-1.5 h-11 w-full border bg-parchment/55 px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                            errors.name ? "border-destructive" : "border-input"
                          }`}
                        />
                        {errors.name && (
                          <p
                            id="err-booking-name"
                            className="mt-1.5 text-[13px] leading-snug text-destructive"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="booking-email"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          E-post <span className="text-primary">*</span>
                        </label>
                        <input
                          id="booking-email"
                          type="email"
                          autoComplete="email"
                          placeholder="nimi@naide.ee"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            clearFieldError("email");
                          }}
                          required
                          aria-required="true"
                          aria-invalid={errors.email ? "true" : undefined}
                          aria-describedby={
                            errors.email ? "err-booking-email" : undefined
                          }
                          className={`mt-1.5 h-11 w-full border bg-parchment/55 px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                            errors.email ? "border-destructive" : "border-input"
                          }`}
                        />
                        {errors.email && (
                          <p
                            id="err-booking-email"
                            className="mt-1.5 text-[13px] leading-snug text-destructive"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Guests */}
                      <div>
                        <label
                          htmlFor="booking-guests"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Inimeste arv <span className="text-primary">*</span>
                        </label>
                        <input
                          id="booking-guests"
                          type="number"
                          min={1}
                          max={300}
                          inputMode="numeric"
                          placeholder="nt 4"
                          value={guests}
                          onChange={(e) => {
                            setGuests(e.target.value);
                            clearFieldError("guests");
                          }}
                          required
                          aria-required="true"
                          aria-invalid={errors.guests ? "true" : undefined}
                          aria-describedby={
                            errors.guests ? "err-booking-guests" : undefined
                          }
                          className={`mt-1.5 h-11 w-full border bg-parchment/55 px-3.5 text-[15px] tabular-nums text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                            errors.guests ? "border-destructive" : "border-input"
                          }`}
                        />
                        {errors.guests && (
                          <p
                            id="err-booking-guests"
                            className="mt-1.5 text-[13px] leading-snug text-destructive"
                          >
                            {errors.guests}
                          </p>
                        )}
                        {parsedGuests >= 15 && (
                          <p className="mt-1.5 text-[12.5px] leading-snug text-muted-foreground">
                            Suuremale seltskonnale soovitame tutvuda ka{" "}
                            <Link
                              to="/gruppidele"
                              className="text-primary underline underline-offset-2 hover:text-accent"
                            >
                              grupimenüüdega
                            </Link>
                            .
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="booking-phone"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Telefon
                        </label>
                        <input
                          id="booking-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+372 5XXX XXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1.5 h-11 w-full border border-input bg-parchment/55 px-3.5 text-[15px] tabular-nums text-foreground placeholder:text-muted-foreground/80 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>

                      {/* Additional notes */}
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="booking-notes"
                          className="block font-display text-[14px] font-semibold text-accent"
                        >
                          Lisainfo restoranile
                        </label>
                        <textarea
                          id="booking-notes"
                          rows={4}
                          placeholder="Erisoovid istumiskoha, tähtpäeva või toitumise kohta..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="mt-1.5 w-full border border-input bg-parchment/55 p-3.5 text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Deposit summary bar matching live pyss.ee/broneeri/ */}
                    <div className="mt-6 border border-border bg-secondary/45 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[14px] text-foreground/80">
                        <span>Ettemaksu summa inimese kohta</span>
                        <span className="font-display text-[16px] font-semibold tabular-nums text-foreground">
                          {formatEur(DEPOSIT_PER_PERSON)}
                        </span>
                      </div>
                      <div
                        role="status"
                        aria-live="polite"
                        className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-border pt-3"
                      >
                        <span className="font-display text-[17px] text-accent">
                          Ettemaks kokku{" "}
                          {parsedGuests > 0 ? `(${parsedGuests} in)` : ""}
                        </span>
                        <span className="font-display text-[26px] font-semibold tabular-nums text-primary">
                          {formatEur(totalDeposit)}
                        </span>
                      </div>
                      <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
                        Broneeringu kinnitamiseks on vajalik tasuda 5 € ettemaks
                        inimese kohta, mille arvestame kohapeal lõpparvest maha.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="h-12 rounded-none px-8 font-display text-[16px] tracking-wide"
                      >
                        Broneeri laud <ChevronRight aria-hidden="true" />
                      </Button>
                      <p className="text-[12.5px] text-muted-foreground">
                        Kinnitus saadetakse sinu e-postile.
                      </p>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Opening hours + How it works + Important rules + Direct contacts */}
              <section
                aria-labelledby="booking-guide-heading"
                className="space-y-8"
              >
                {/* Prominent opening hours card matching ContactPage */}
                <div className="border border-border bg-background/90 p-6 sm:p-7">
                  <div className="flex items-center gap-2.5 text-primary">
                    <Clock3 className="h-5 w-5" aria-hidden="true" />
                    <p className="font-display text-[12px] uppercase tracking-[0.24em]">
                      Oleme avatud
                    </p>
                  </div>
                  <dl className="mt-5 space-y-3">
                    <div className="flex items-baseline justify-between gap-4 border-b border-border/70 pb-3">
                      <dt className="font-display text-[17px] text-accent">
                        Pühapäev – Teisipäev (P–T)
                      </dt>
                      <dd className="shrink-0 font-display text-[19px] font-semibold tabular-nums text-primary">
                        12:00 – 22:00
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="font-display text-[17px] text-accent">
                        Kolmapäev – Laupäev (K–L)
                      </dt>
                      <dd className="shrink-0 font-display text-[19px] font-semibold tabular-nums text-primary">
                        12:00 – 01:00
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* 4 steps from live site */}
                <div className="border border-border bg-background/80 p-6 sm:p-7">
                  <p className="font-display text-[12px] uppercase tracking-[0.24em] text-primary">
                    Lihtne ja kiire
                  </p>
                  <h2
                    id="booking-guide-heading"
                    className="mt-1.5 font-display text-[24px] text-accent"
                  >
                    Kuidas lauda broneerida
                  </h2>

                  <ol className="mt-6 space-y-5">
                    {STEPS.map((step) => (
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

                {/* Important booking notes (P.S. & deposit rules) */}
                <div className="border border-brass/35 bg-cellar-deep p-6 text-parchment sm:p-7">
                  <p className="font-display text-[12px] uppercase tracking-[0.24em] text-brass">
                    Oluline meelespea
                  </p>
                  <ul className="mt-4 space-y-4 text-[14px] leading-relaxed text-parchment/85">
                    <li className="flex gap-3">
                      <Calendar
                        className="mt-1 h-4 w-4 shrink-0 text-brass"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-parchment">
                          Samal päeval broneerimine:
                        </strong>{" "}
                        samal päeval saab lauda broneerida ainult telefoni teel
                        või kohapeal.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Clock3
                        className="mt-1 h-4 w-4 shrink-0 text-brass"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-parchment">
                          Ettemaks 5 € / inimene:
                        </strong>{" "}
                        arvestatakse kohapeal lõpparvest maha. Täpsemad juhised
                        saadame kinnituskirjas.
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Info
                        className="mt-1 h-4 w-4 shrink-0 text-brass"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-parchment">
                          Piletiga üritused:
                        </strong>{" "}
                        online-broneering ega ettemaksu tasumine ei vabasta
                        pileti ostmisest piletiga üritustel.
                      </span>
                    </li>
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

                {/* Larger groups link */}
                <div className="border border-border bg-secondary/45 p-6">
                  <p className="font-display text-[12px] uppercase tracking-[0.22em] text-primary">
                    Suurem seltskond või privaatruum?
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-foreground/80">
                    Kuni 30-liikmelistele seltskondadele sobib privaatne{" "}
                    <strong className="font-semibold text-accent">
                      Schrammi kamber
                    </strong>
                    , kogu restoran mahutab kuni 300 külalist.
                  </p>
                  <Link
                    to="/gruppidele"
                    className="mt-4 inline-flex items-center gap-1.5 font-display text-[15px] text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-accent"
                  >
                    <Users className="h-4 w-4" aria-hidden="true" />
                    Vaata peoruumide ja grupimenüü infot
                  </Link>
                </div>
              </section>
            </div>
          </section>
        </div>
      </main>

      <HistoryFooter />
    </div>
  );
}
