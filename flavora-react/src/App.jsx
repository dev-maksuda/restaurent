/* ============================================================
   FLAVORA RESTAURANT — App.jsx
   The whole page is just a list of components, in order.
   Every section of the site is one file inside src/components/.
============================================================ */

import { ToastProvider } from "./components/Toast";

import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Dishes from "./components/Dishes";
import Menu from "./components/Menu";
import Offers from "./components/Offers";
import Stats from "./components/Stats";
import Chefs from "./components/Chefs";
import Gallery from "./components/Gallery";
import Reserve from "./components/Reserve";
import Testimonials from "./components/Testimonials";
import Blog from "./components/Blog";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <ToastProvider>
      {/* Loading screen (not a section, just a helper) */}
      <Preloader />

      {/* 1. Header / navigation bar */}
      <Header />

      <main>
        {/* 2. Hero — first screen with the slider */}
        <Hero />

        {/* 3. About our story */}
        <About />

        {/* 4. Why choose us */}
        <Features />

        {/* 5. Signature dishes */}
        <Dishes />

        {/* 6. Full menu */}
        <Menu />

        {/* 7. Offers + countdown */}
        <Offers />

        {/* 8. Numbers / stats */}
        <Stats />

        {/* 9. Our chefs */}
        <Chefs />

        {/* 10. Gallery + lightbox */}
        <Gallery />

        {/* 11. Reservation form */}
        <Reserve />

        {/* 12. Guest reviews */}
        <Testimonials />

        {/* 13. Blog cards */}
        <Blog />

        {/* 14. Newsletter */}
        <Newsletter />
      </main>

      {/* 15. Footer */}
      <Footer />

      {/* Round button that scrolls back to the top */}
      <BackToTop />
    </ToastProvider>
  );
}
