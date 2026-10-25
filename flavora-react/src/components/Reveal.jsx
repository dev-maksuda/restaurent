/* ============================================================
   Reveal — fades a block in as soon as it enters the screen.
   It replaces the old ".reveal" scroll animation from script.js.
============================================================ */

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",     // which element to render (div, article, figure ...)
  className = "",
  delay = 0,           // small delay so cards appear one after another
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect(); // only animate once
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
