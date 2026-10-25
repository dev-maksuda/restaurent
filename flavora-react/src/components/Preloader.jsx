/* ============================================================
   0. PRELOADER — small loading screen shown while the page loads
============================================================ */

import { useEffect, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function hide() {
      setTimeout(() => setHidden(true), 500);
    }

    if (document.readyState === "complete") hide();
    else window.addEventListener("load", hide);

    return () => window.removeEventListener("load", hide);
  }, []);

  return (
    <div className={`preloader ${hidden ? "is-hidden" : ""}`}>
      <div className="preloader__plate">
        <span>🍽️</span>
      </div>
      <p className="preloader__text">Flavora</p>
    </div>
  );
}
