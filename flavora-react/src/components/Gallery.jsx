/* ============================================================
   10. GALLERY — filter tabs + lightbox.
   Click any picture to show it big, press Esc or click outside to close.
============================================================ */

import { useEffect, useState } from "react";

import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const TABS = [
  { key: "all", label: "All" },
  { key: "food", label: "Food" },
  { key: "place", label: "Place" },
  { key: "drink", label: "Drinks" },
];

const PHOTOS = [
  { cat: "place", image: "/images/img-17.jpg", alt: "Dining area", caption: "Our Dining Space" },
  { cat: "drink", image: "/images/img-18.jpg", alt: "Coffee", caption: "Fresh Coffee" },
  { cat: "food", image: "/images/img-19.jpg", alt: "Desserts", caption: "Sweet Corner" },
  { cat: "food", image: "/images/img-20.jpg", alt: "Sushi", caption: "Chef's Sushi" },
  { cat: "food", image: "/images/img-21.jpg", alt: "Barbecue", caption: "Weekend BBQ" },
  { cat: "drink", image: "/images/img-22.jpg", alt: "Drinks", caption: "Signature Drinks" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(null); // the picture shown in the lightbox

  // The Esc key closes the lightbox
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") setPreview(null);
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="section section--tint gallery" id="gallery">
      <div className="container">

        <SectionHead tag="Our Gallery" title={<>A Look Inside <em>Flavora</em></>} />

        {/* Filter tabs */}
        <Reveal className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab ${filter === tab.key ? "is-active" : ""}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </Reveal>

        <div className="gallery__grid">
          {PHOTOS.map((photo, i) => (
            <Reveal
              as="figure"
              key={photo.caption}
              className={`gallery__item ${filter !== "all" && photo.cat !== filter ? "is-hide" : ""}`}
              delay={(i % 4) * 90}
              onClick={() => setPreview(photo)}
            >
              <img src={photo.image} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </Reveal>
          ))}
        </div>

      </div>

      {/* Lightbox to preview the gallery pictures */}
      <div
        className={`lightbox ${preview ? "is-open" : ""}`}
        onClick={(event) => {
          // only close when the dark background itself is clicked
          if (event.target === event.currentTarget) setPreview(null);
        }}
      >
        <button
          className="lightbox__close"
          aria-label="Close"
          onClick={() => setPreview(null)}
        >
          ×
        </button>

        {preview && <img src={preview.image} alt={preview.alt} />}
      </div>

    </section>
  );
}
