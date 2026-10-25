/* ============================================================
   15. FOOTER — logo, quick links, opening hours and contact
============================================================ */

const QUICK_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#dishes", label: "Our Dishes" },
  { href: "#offers", label: "Offers" },
  { href: "#gallery", label: "Gallery" },
  { href: "#blog", label: "Blog" },
];

const OPENING_HOURS = [
  { day: "Mon – Thu", time: "10:00 – 23:00" },
  { day: "Friday", time: "14:00 – 23:30" },
  { day: "Saturday", time: "10:00 – 23:30" },
  { day: "Sunday", time: "10:00 – 22:00" },
];

const SOCIALS = [
  { label: "Facebook", short: "f" },
  { label: "Instagram", short: "ig" },
  { label: "Youtube", short: "yt" },
  { label: "X", short: "x" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        <div className="footer__col">
          <a href="#home" className="logo logo--footer">
            <span className="logo__icon">🍴</span>
            <span className="logo__text">Fla<em>vora</em></span>
          </a>

          <p>
            A modern kitchen serving honest, fresh and flavourful food since 2013.
            Come hungry, leave happy.
          </p>

          <div className="footer__social">
            {SOCIALS.map((social) => (
              <a href="#!" key={social.label} aria-label={social.label}>
                {social.short}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Opening Hours</h4>
          <ul className="footer__hours">
            {OPENING_HOURS.map((row) => (
              <li key={row.day}>
                <span>{row.day}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact Us</h4>
          <ul className="footer__links">
            <li>24 Gulshan Avenue, Dhaka</li>
            <li><a href="tel:+8801712345678">+880 1712-345678</a></li>
            <li><a href="mailto:hello@flavora.com">hello@flavora.com</a></li>
          </ul>
        </div>

      </div>

      <div className="container footer__bottom">
        <p>© 2026 Flavora Restaurant. All rights reserved.</p>
        <p>Designed &amp; built with React.</p>
      </div>
    </footer>
  );
}
