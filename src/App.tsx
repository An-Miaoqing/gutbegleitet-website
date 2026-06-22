import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import NewsPage from "./pages/NewsPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ueber-uns" element={<AboutPage />} />
          <Route path="leistungen" element={<ServicesPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="beratung" element={<BookingPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="impressum" element={<LegalPage title="Impressum" type="impressum" />} />
          <Route path="datenschutz" element={<LegalPage title="Datenschutz" type="datenschutz" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
