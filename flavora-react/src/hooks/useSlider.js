/* ============================================================
   useSlider — moves through a list of slides on a timer.
   The hero and the testimonials both use this same hook.
============================================================ */

import { useEffect, useState } from "react";

export default function useSlider(count, delay = 5000) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Go to the next slide again and again while the user is not hovering
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, delay);

    return () => clearInterval(timer);
  }, [paused, count, delay]);

  return {
    index,
    goTo: (i) => setIndex(i),
    next: () => setIndex((current) => (current + 1) % count),
    prev: () => setIndex((current) => (current - 1 + count) % count),
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
