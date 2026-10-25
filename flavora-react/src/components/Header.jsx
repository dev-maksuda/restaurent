/* ============================================================
   1. HEADER — logo, menu, "Book a Table" button, mobile menu
   and the highlight of the menu item that is in view (scroll spy)
============================================================ */

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "dishes", label: "Dishes" },
  { id: "menu", label: "Menu" },
  { id: "offers", label: "Offers" },
  { id: "gallery", label: "Gallery" },
  { id: "blog", label: "Blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y > 60);

      // Which section is on the screen right now?
      document.querySelectorAll("main section[id]").forEach((section) => {
        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;

        if (y >= top && y < bottom) setActive(section.id);
      });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header__inner">

        <a href="#home" className="logo">
          <span className="logo__icon">🍴</span>
          <span className="logo__text">Fla<em>vora</em></span>
        </a>

        <nav className={`nav ${menuOpen ? "is-open" : ""}`}>
          <ul className="nav__menu">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`nav__link ${active === link.id ? "is-active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a href="#reserve" className="btn btn--primary btn--sm">Book a Table</a>

          <button
            className={`nav__toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>

      </div>
    </header>
  );
}
