/* ============================================================
   2. HERO — the first screen: background slider, headline,
   two buttons and three quick facts
============================================================ */

import useSlider from "../hooks/useSlider";

// The three background pictures of the slider
const SLIDES = ["/images/img-01.jpg", "/images/img-02.jpg", "/images/img-03.jpg"];

const FACTS = [
  { number: "12+", label: "Years of Taste" },
  { number: "180+", label: "Signature Recipes" },
  { number: "4.9★", label: "Customer Rating" },
];

export default function Hero() {
  const slider = useSlider(SLIDES.length, 6000);

  return (
    <section className="hero" id="home">

      {/* Background slides */}
      <div
        className="hero__slides"
        onMouseEnter={slider.pause}
        onMouseLeave={slider.resume}
      >
        {SLIDES.map((image, i) => (
          <div
            key={image}
            className={`hero__slide ${i === slider.index ? "is-active" : ""}`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>

      <div className="hero__overlay"></div>

      {/* Floating decorative circles */}
      <span className="hero__blob hero__blob--1"></span>
      <span className="hero__blob hero__blob--2"></span>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__tag">🔥 Welcome to Flavora Restaurant</p>

          <h1 className="hero__title">
            Taste the <em>Flavour</em><br />
            of Real Happiness
          </h1>

          <p className="hero__text">
            Freshly sourced ingredients, bold spices and recipes passed down through
            generations — served in a place that feels like home.
          </p>

          <div className="hero__buttons">
            <a href="#menu" className="btn btn--primary">Explore Our Menu</a>
            <a href="#reserve" className="btn btn--ghost">Reserve a Table</a>
          </div>

          <ul className="hero__facts">
            {FACTS.map((fact) => (
              <li key={fact.label}>
                <strong>{fact.number}</strong>
                <span>{fact.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slider controls */}
      <button className="hero__arrow hero__arrow--prev" aria-label="Previous" onClick={slider.prev}>‹</button>
      <button className="hero__arrow hero__arrow--next" aria-label="Next" onClick={slider.next}>›</button>

      <div className="hero__dots">
        {SLIDES.map((image, i) => (
          <button
            key={image}
            className={`hero__dot ${i === slider.index ? "is-active" : ""}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => slider.goTo(i)}
          />
        ))}
      </div>

    </section>
  );
}
