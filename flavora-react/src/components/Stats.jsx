/* ============================================================
   8. STATS — four numbers that count up when you scroll to them
============================================================ */

import { useEffect, useRef, useState } from "react";

import Reveal from "./Reveal";

const STATS = [
  { count: 85, label: "Team Members" },
  { count: 12000, label: "Happy Customers" },
  { count: 180, label: "Menu Items" },
  { count: 24, label: "Awards Won" },
];

// Turns 12000 into a short "12k+" and 85 into "85"
function formatNumber(count, value) {
  if (count >= 1000 && value >= 1000) return `${Math.floor(value / 1000)}k+`;
  return value.toLocaleString("en-US");
}

// One number of the stats row
function Stat({ count, label }) {
  const numberRef = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = numberRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1600; // the counting takes about 1.6 seconds
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.floor(progress * count));

          if (progress < 1) requestAnimationFrame(step);
          else setValue(count);
        }

        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [count]);

  return (
    <Reveal className="stat">
      <strong className="stat__num" ref={numberRef}>{formatNumber(count, value)}</strong>
      <span>{label}</span>
    </Reveal>
  );
}

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats__grid">
        {STATS.map((stat) => (
          <Stat key={stat.label} count={stat.count} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
