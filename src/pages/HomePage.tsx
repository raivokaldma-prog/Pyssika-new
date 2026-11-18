import { useEffect } from "react";
import { Header } from "../components/site/Header";
import { Hero } from "../components/site/Hero";
import {
  Highlights,
  News,
  ProgramBand,
  VirtualTour,
} from "../components/site/Sections";
import { HistoryFooter } from "../components/site/HistoryFooter";
import { A } from "../components/site/assets";

export function HomePage() {
  useEffect(() => {
    document.title = "Püssirohukelder – maailma kõrgeim õllerestoran Tartus";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <div
          className="relative"
          style={{
            backgroundImage: `url(${A.paper})`,
            backgroundRepeat: "repeat",
          }}
        >
          <Highlights />
          <News />
          <ProgramBand />
          <VirtualTour />
        </div>
      </main>
      <HistoryFooter />
    </div>
  );
}
