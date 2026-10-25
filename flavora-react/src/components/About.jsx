/* ============================================================
   3. ABOUT — two pictures with a badge on the left,
   the story of the restaurant on the right
============================================================ */

import Reveal from "./Reveal";

const POINTS = [
  "100% fresh, hand-picked local ingredients",
  "Experienced chefs with global training",
  "Clean, comfortable and family friendly space",
  "Fast home delivery within 30 minutes",
];

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">

        <Reveal className="about__media">
          <img
            className="about__img about__img--big"
            src="/images/img-04.jpg"
            alt="Chef cooking in the kitchen"
            loading="lazy"
          />

          <img
            className="about__img about__img--small"
            src="/images/img-05.jpg"
            alt="Fresh ingredients"
            loading="lazy"
          />

          <div className="about__badge">
            <strong>12+</strong>
            <span>Years of<br />Experience</span>
          </div>
        </Reveal>

        <Reveal className="about__body">
          <p className="section__tag">About Our Story</p>
          <h2 className="section__title">A Kitchen Built on <em>Passion</em> &amp; Freshness</h2>

          <p className="section__text">
            Flavora started back in 2013 as a tiny kitchen with only six tables. Today we
            serve hundreds of happy guests every single day — but the promise is exactly
            the same: honest food, cooked fresh, served with a smile.
          </p>

          <ul className="check-list">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="about__footer">
            <a href="#chefs" className="btn btn--primary">Meet Our Chefs</a>

            <div className="about__sign">
              <span>Rafiq Hasan</span>
              <small>Founder &amp; Head Chef</small>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
