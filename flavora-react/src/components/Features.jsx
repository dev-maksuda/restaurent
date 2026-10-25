/* ============================================================
   4. FEATURES — four small cards that explain why to choose us
============================================================ */

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const FEATURES = [
  {
    icon: "🌿",
    title: "Fresh Ingredients",
    text: "Vegetables and meat arrive every morning from trusted local farms.",
  },
  {
    icon: "👨‍🍳",
    title: "Expert Chefs",
    text: "Our kitchen team has over 40 years of combined culinary experience.",
  },
  {
    icon: "⚡",
    title: "Quick Service",
    text: "Hot food on your table in under 15 minutes, every time you visit.",
  },
  {
    icon: "🚚",
    title: "Free Delivery",
    text: "No delivery charge on any order above ৳800 inside the city.",
  },
];

export default function Features() {
  return (
    <section className="section section--tint features" id="features">
      <div className="container">

        <SectionHead
          tag="Why Choose Us"
          title={<>More Than Just <em>Great Food</em></>}
        />

        <div className="features__grid">
          {FEATURES.map((feature, i) => (
            <Reveal
              as="article"
              key={feature.title}
              className="feature-card"
              delay={(i % 4) * 90}
            >
              <div className="feature-card__icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
