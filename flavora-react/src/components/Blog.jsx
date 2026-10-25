/* ============================================================
   13. BLOG — three small news cards from the kitchen
============================================================ */

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const POSTS = [
  {
    image: "/images/img-23.jpg",
    alt: "Plating",
    date: "12 Oct",
    tag: "Kitchen Tips",
    title: "5 Secrets Behind Perfect Plating",
    text: "Small details change how a dish tastes in your mind. Here is how our chefs plate every plate.",
  },
  {
    image: "/images/img-24.jpg",
    alt: "Coffee culture",
    date: "28 Sep",
    tag: "Coffee",
    title: "Why Our Coffee Tastes Different",
    text: "We roast small batches every week — and that single habit changes everything in the cup.",
  },
  {
    image: "/images/img-25.jpg",
    alt: "Seasonal food",
    date: "05 Sep",
    tag: "Sourcing",
    title: "Cooking With the Season",
    text: "Meet the farmers who supply our kitchen and why seasonal food simply tastes better.",
  },
];

export default function Blog() {
  return (
    <section className="section blog" id="blog">
      <div className="container">

        <SectionHead tag="From Our Blog" title={<>Kitchen <em>Stories</em> &amp; News</>} />

        <div className="blog__grid">
          {POSTS.map((post, i) => (
            <Reveal
              as="article"
              key={post.title}
              className="blog-card"
              delay={(i % 4) * 90}
            >
              <div className="blog-card__thumb">
                <img src={post.image} alt={post.alt} loading="lazy" />
                <span className="blog-card__date">{post.date}</span>
              </div>

              <div className="blog-card__body">
                <span className="blog-card__tag">{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <a href="#!" className="blog-card__link">Read More →</a>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
