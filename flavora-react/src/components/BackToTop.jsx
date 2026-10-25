/* ============================================================
   BackToTop — the round arrow button at the bottom right corner
============================================================ */

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > 500);
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`to-top ${show ? "is-show" : ""}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}
