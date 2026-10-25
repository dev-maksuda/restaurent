/* ============================================================
   SectionHead — the small tag line + big title used at the top
   of most sections, so we do not repeat the same markup.
============================================================ */

import Reveal from "./Reveal";

export default function SectionHead({ tag, title, text }) {
  return (
    <Reveal className="section__head">
      <p className="section__tag">{tag}</p>
      <h2 className="section__title">{title}</h2>
      {text && <p className="section__text">{text}</p>}
    </Reveal>
  );
}
