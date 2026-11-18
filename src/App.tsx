import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { GroupsPage } from "./pages/GroupsPage";
import { MugSocietyPage } from "./pages/MugSocietyPage";
import { MenuPage } from "./pages/MenuPage";
import { GalleryPage } from "./pages/GalleryPage";
import { BookingPage } from "./pages/BookingPage";
import { ContactPage } from "./pages/ContactPage";
import { ProgramPage } from "./pages/ProgramPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-foreground">
          Lehte ei leitud
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Otsitud lehekülge ei ole olemas või on see teisaldatud.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tagasi avalehele
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menuu" element={<MenuPage />} />
        <Route path="/programm" element={<ProgramPage />} />
        <Route path="/gruppidele" element={<GroupsPage />} />
        <Route path="/kannumeestele" element={<MugSocietyPage />} />
        <Route path="/galerii" element={<GalleryPage />} />
        <Route path="/broneeri" element={<BookingPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
