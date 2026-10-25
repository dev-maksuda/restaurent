/* ============================================================
   12. TESTIMONIALS — what the guests say, one card at a time
   (same slider logic as the hero section)
============================================================ */

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import useSlider from "../hooks/useSlider";

const REVIEWS = [
  {
    text: "The biryani here is easily the best I have had in Dhaka. Warm staff, beautiful interior and very reasonable prices.",
    avatar: "SA",
    name: "Sadia Afrin",
    role: "Food Blogger",
  },
  {
    text: "We booked the whole place for my brother's birthday. The team decorated everything and the cake was on the house. Unforgettable evening!",
    avatar: "MR",
    name: "Mahmud Rahman",
    role: "Regular Guest",
  },
  {
    text: "I order lunch from Flavora almost every working day. Always fresh, always on time and the packaging is spotless.",
    avatar: "TH",
    name: "Tahmina Haque",
    role: "Corporate Client",
  },
];

export default function Testimonials() {
  const slider = useSlider(REVIEWS.length, 5500);

  return (
    <section className="section section--dark testimonials" id="testimonials">
      <div className="container">

        <SectionHead tag="Testimonials" title={<>What Our <em>Guests Say</em></>} />

        <Reveal
          className="t-slider"
          onMouseEnter={slider.pause}
          onMouseLeave={slider.resume}
        >
          {REVIEWS.map((review, i) => (
            <div className={`t-card ${i === slider.index ? "is-active" : ""}`} key={review.name}>
              <div className="t-card__quote">”</div>
              <p className="t-card__text">{review.text}</p>

              <div className="t-card__user">
                <span className="t-card__avatar">{review.avatar}</span>
                <div>
                  <strong>{review.name}</strong>
                  <small>{review.role}</small>
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        <div className="t-slider__dots">
          {REVIEWS.map((review, i) => (
            <button
              key={review.name}
              className={`hero__dot ${i === slider.index ? "is-active" : ""}`}
              aria-label={`Review ${i + 1}`}
              onClick={() => slider.goTo(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
