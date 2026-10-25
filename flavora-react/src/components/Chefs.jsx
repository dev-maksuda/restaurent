/* ============================================================
   9. CHEFS — the three people behind the kitchen
============================================================ */

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const CHEFS = [
  { image: "/images/img-14.jpg", alt: "Chef Rafiq Hasan", name: "Rafiq Hasan", role: "Head Chef" },
  { image: "/images/img-15.jpg", alt: "Chef Nusrat Jahan", name: "Nusrat Jahan", role: "Pastry Chef" },
  { image: "/images/img-16.jpg", alt: "Chef Tanvir Ahmed", name: "Tanvir Ahmed", role: "Sous Chef" },
];

const SOCIALS = [
  { label: "Facebook", short: "f" },
  { label: "Instagram", short: "ig" },
  { label: "Twitter", short: "x" },
];

export default function Chefs() {
  return (
    <section className="section chefs" id="chefs">
      <div className="container">

        <SectionHead tag="Our Team" title={<>Meet Our Expert <em>Chefs</em></>} />

        <div className="chefs__grid">
          {CHEFS.map((chef, i) => (
            <Reveal
              as="article"
              key={chef.name}
              className="chef-card"
              delay={(i % 4) * 90}
            >
              <div className="chef-card__thumb">
                <img src={chef.image} alt={chef.alt} loading="lazy" />

                <div className="chef-card__social">
                  {SOCIALS.map((social) => (
                    <a href="#!" key={social.label} aria-label={social.label}>
                      {social.short}
                    </a>
                  ))}
                </div>
              </div>

              <h3>{chef.name}</h3>
              <span>{chef.role}</span>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
